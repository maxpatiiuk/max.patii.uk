/**
 * Static Site Forge – Vite plugin (v2 reference implementation)
 *
 * Uses the Vite Environment API (Vite 6+) for SSR-based static site
 * generation. Transforms .md files into Lit JS modules, serves them via
 * SSR during development, and prerenders them to static HTML during build.
 */

import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

import type { Plugin, UserConfig } from 'vite';
import { isRunnableDevEnvironment } from 'vite';

import { html as staticHtml, unsafeStatic } from 'lit/static-html.js';
import type { TemplateResult } from 'lit';

import { markdownToJs } from './markdown/markdownToJs.ts';
import { renderToString } from './ssr.js';
import { pagesDirectory } from './const.js';

/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, no-await-in-loop */

// ---------------------------------------------------------------------------
// Types — should replace the ones in types.ts once integrated
// ---------------------------------------------------------------------------

/**
 * The plugin treats SiteConfig as opaque — it just passes it through to
 * .md render functions and layout components.
 */
type SiteConfig = Record<string, unknown>;

type PageMetadata = {
  readonly title: string;
  readonly description?: string;
  /** Module path to override the collection's defaultLayout. */
  readonly layout?: string;
  /** Extra fields consumed by layout components (gitHub, ogImage, etc.). */
  readonly [key: string]: unknown;
};

type Collection = {
  /** Module path for the default layout (e.g. '@maxpatiiuk/web-components/components/mp-project-layout'). */
  readonly defaultLayout: string;
  readonly pages: Record<string, PageMetadata>;
};

type ForgeConfig = {
  readonly siteConfig: SiteConfig;
  readonly collections: Record<string, Collection>;
};

// ---------------------------------------------------------------------------
// Plugin
// ---------------------------------------------------------------------------

/**
 * Create the Static Site Forge Vite plugin.
 *
 * @param config - Forge configuration (site metadata + page collections).
 */
export function useStaticSiteForge(config: ForgeConfig): Plugin {
  let root = process.cwd();
  let clientOutDir = 'dist';

  // Flag set during buildApp so writeBundle knows which environment just built.
  let isSsrBuild = false;

  return {
    name: 'static-site-forge',

    // ------------------------------------------------------------------
    // config – add SSR environment build entries + custom buildApp
    // ------------------------------------------------------------------
    config(userConfig): UserConfig {
      root = resolve(userConfig.root ?? '.');

      // Collect all .md files and layout modules as SSR build entry points.
      const ssrInput: Record<string, string> = {};
      const layoutPaths = new Set<string>();

      for (const [collectionName, collection] of Object.entries(
        config.collections,
      )) {
        layoutPaths.add(collection.defaultLayout);

        for (const [slug, metadata] of Object.entries(collection.pages)) {
          const isRoot = collectionName === 'root';
          const mdRel = isRoot
            ? `${pagesDirectory}/${slug}.md`
            : `${pagesDirectory}/${collectionName}/${slug}.md`;

          ssrInput[`md/${isRoot ? '' : `${collectionName}/`}${slug}`] = resolve(
            root,
            mdRel,
          );

          if (metadata.layout !== undefined) {
            layoutPaths.add(metadata.layout);
          }
        }
      }

      for (const layoutPath of layoutPaths) {
        // Use the last path segment as entry name (e.g. 'mp-project-layout').
        const name = layoutPath.split('/').pop()!;
        ssrInput[`layout/${name}`] = layoutPath;
      }

      return {
        environments: {
          ssr: {
            build: {
              outDir: 'dist-ssr',
              rollupOptions: { input: ssrInput },
            },
          },
        },
        builder: {
          buildApp: async (builder): Promise<void> => {
            // Client first — produces static assets, CSS, client JS.
            await builder.build(builder.environments.client);
            // SSR second — produces modules used for prerendering.
            isSsrBuild = true;
            await builder.build(builder.environments.ssr);
            isSsrBuild = false;
          },
        },
      };
    },

    // ------------------------------------------------------------------
    // configResolved – capture resolved root and client output directory
    // ------------------------------------------------------------------
    configResolved(resolved): void {
      root = resolved.root;
      clientOutDir = resolve(resolved.root, resolved.build.outDir);
    },

    // ------------------------------------------------------------------
    // transform – .md → JS module (delegates to transformMarkdown)
    // ------------------------------------------------------------------
    transform(code, id): string | null {
      if (id.endsWith('.md')) {
        return markdownToJs(code);
      }
      return null;
    },

    // ------------------------------------------------------------------
    // configureServer – dev middleware + HMR on .md content changes
    // ------------------------------------------------------------------
    configureServer(server): void {
      server.middlewares.use((req, res, next) => {
        const handleRequest = async (): Promise<void> => {
          const url = req.url ?? '/';
          const resolved = resolveUrlToPage(url, config.collections);

          if (resolved === undefined) {
            next();
            return;
          }

          // Guard: the SSR environment must be runnable (has a module runner).
          const ssr = server.environments.ssr;
          if (!isRunnableDevEnvironment(ssr)) {
            throw new Error(
              'SSR environment is not runnable — check your Vite config',
            );
          }

          try {
            const html = await renderPage({
              ...resolved,
              siteConfig: config.siteConfig,
              importModule: async (id): Promise<Record<string, unknown>> =>
                await ssr.runner.import(id),
              root,
            });
            res.setHeader('Content-Type', 'text/html');
            res.end(html);
          } catch (error) {
            console.error(
              `[static-site-forge] Failed to render ${url}:`,
              error,
            );
            res.statusCode = 500;
            res.end(
              `Internal Server Error: ${error instanceof Error ? error.message : String(error)}`,
            );
          }
        };

        handleRequest().catch(next);
      });

      // .md content changes produce new HTML → full-reload instead of HMR.
      server.watcher.on('change', (path) => {
        if (path.endsWith('.md')) {
          server.hot.send({ type: 'full-reload' });
        }
      });
    },

    // ------------------------------------------------------------------
    // writeBundle – prerender all pages (SSR build only)
    // ------------------------------------------------------------------
    async writeBundle(options, bundle): Promise<void> {
      if (!isSsrBuild) {
        return;
      }

      // Build a lookup from original module ID → absolute output file path.
      // `facadeModuleId` is the ID Rollup resolved each entry point to.
      const ssrDir = resolve(options.dir ?? 'dist-ssr');
      const moduleToOutput = new Map<string, string>();

      for (const [fileName, chunk] of Object.entries(bundle)) {
        if (chunk.type === 'chunk' && chunk.facadeModuleId) {
          moduleToOutput.set(chunk.facadeModuleId, resolve(ssrDir, fileName));
        }
      }

      // Import a module from the SSR build output by its original ID.
      const importModule = async (
        id: string,
      ): Promise<Record<string, unknown>> => {
        // Try exact match (works for npm package specifiers).
        let outputPath = moduleToOutput.get(id);

        // Try resolved absolute path (works for local .md files where
        // the ID we pass starts with '/' = project-relative).
        if (outputPath === undefined) {
          const abs = id.startsWith('/')
            ? resolve(root, id.slice(1))
            : resolve(root, id);
          outputPath = moduleToOutput.get(abs);
        }

        if (outputPath === undefined) {
          throw new Error(
            `[static-site-forge] No SSR output chunk for module: ${id}`,
          );
        }

        return await (import(pathToFileURL(outputPath).href) as Promise<
          Record<string, unknown>
        >);
      };

      // Prerender each page sequentially to limit memory usage.
      for (const [collectionName, collection] of Object.entries(
        config.collections,
      )) {
        for (const [slug, metadata] of Object.entries(collection.pages)) {
          const isRoot = collectionName === 'root';
          const url = isRoot
            ? slug === 'index'
              ? '/'
              : `/${slug}/`
            : `/${collectionName}/${slug}/`;

          try {
            const html = await renderPage({
              collectionName,
              slug,
              metadata,
              collection,
              siteConfig: config.siteConfig,
              importModule,
              root,
            });

            const outputPath =
              isRoot && slug === 'index'
                ? resolve(clientOutDir, 'index.html')
                : resolve(clientOutDir, url.slice(1), 'index.html');

            await mkdir(dirname(outputPath), { recursive: true });
            await writeFile(outputPath, html, 'utf-8');
            console.log(`[static-site-forge] ${url} → ${outputPath}`);
          } catch (error) {
            console.error(
              `[static-site-forge] Failed to generate ${url}:`,
              error,
            );
          }
        }
      }
    },
  };
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

type ResolvedPage = {
  collectionName: string;
  slug: string;
  metadata: PageMetadata;
  collection: Collection;
};

/**
 * Map a request URL to a page in the collections.
 *
 * Routing rules:
 * - The `root` collection owns top-level URLs: `/` → slug `index`, `/foo/` → slug `foo`.
 * - Named collections own their prefix: `/projects/bar/` → collection `projects`, slug `bar`.
 */
function resolveUrlToPage(
  url: string,
  collections: Record<string, Collection>,
): ResolvedPage | undefined {
  // Strip query string and hash.
  const pathname = url.split(/[?#]/u)[0];
  // Normalize: remove trailing slash (keep '/' as-is).
  const normalized = pathname === '/' ? '/' : pathname.replace(/\/$/u, '');

  // Try named collections first (e.g. /projects/foo).
  for (const [name, collection] of Object.entries(collections)) {
    if (name === 'root') {
      continue;
    }

    const prefix = `/${name}/`;
    if (normalized.startsWith(prefix) || normalized === `/${name}`) {
      const slug =
        normalized === `/${name}` ? 'index' : normalized.slice(prefix.length);
      if (Object.hasOwn(collection.pages, slug)) {
        return {
          collectionName: name,
          slug,
          metadata: collection.pages[slug],
          collection,
        };
      }
    }
  }

  // Fall back to root collection.
  if (Object.hasOwn(collections, 'root')) {
    const rootCollection = collections.root;
    const slug = normalized === '/' ? 'index' : normalized.slice(1);
    if (Object.hasOwn(rootCollection.pages, slug)) {
      return {
        collectionName: 'root',
        slug,
        metadata: rootCollection.pages[slug],
        collection: rootCollection,
      };
    }
  }

  return undefined;
}

/** A function that loads a module by specifier and returns its exports. */
type ImportFn = (id: string) => Promise<Record<string, unknown>>;

/**
 * Shared render pipeline for a single page (used by both dev and build).
 *
 * Steps:
 * 1. Import the .md module and call `render(siteConfig)` to get content.
 * 2. Import the layout module and extract the custom element tag name.
 * 3. Compose: `<layout-tag .layoutData=${...}>${content}</layout-tag>`.
 * 4. Render the composed template to an HTML string via Lit SSR.
 */
async function renderPage(options: {
  collectionName: string;
  slug: string;
  metadata: PageMetadata;
  collection: Collection;
  siteConfig: SiteConfig;
  importModule: ImportFn;
  root: string;
}): Promise<string> {
  const {
    collectionName,
    slug,
    metadata,
    collection,
    siteConfig,
    importModule,
  } = options;

  // 1. Determine the .md file path (project-relative with leading /).
  const isRoot = collectionName === 'root';
  const mdPath = isRoot
    ? `/${pagesDirectory}/${slug}.md`
    : `/${pagesDirectory}/${collectionName}/${slug}.md`;

  // 2. Import the transformed .md module → { render(context) → TemplateResult }.
  const mdModule = await importModule(mdPath);
  const render = mdModule.render as (context: SiteConfig) => TemplateResult;
  const contentTemplate = render(siteConfig);

  // 3. Resolve the layout module path (page override or collection default).
  const layoutPath = metadata.layout ?? collection.defaultLayout;

  // 4. Import the layout module and extract its custom element tag name.
  const layoutModule = await importModule(layoutPath);
  const tagName = getLayoutTagName(layoutModule, layoutPath);

  // 5. Compose content inside the layout component.
  //
  //    The layout receives `.layoutData` (page metadata + siteConfig) and
  //    renders the content via <slot>.
  //
  //    Cross-context note: contentTemplate was produced by the runner's copy
  //    of `lit`, while this outer template uses the plugin's copy. Lit SSR
  //    uses duck typing (`_$litType$` check), so they compose correctly.
  const layoutData = { ...metadata, siteConfig };
  const tag = unsafeStatic(tagName);
  const fullTemplate = staticHtml`<${tag} .layoutData=${layoutData}>${contentTemplate}</${tag}>`;

  // 6. Render to HTML string via Lit SSR.
  return await renderToString(fullTemplate);
}

/**
 * Extract the custom element tag name from a layout module.
 *
 * Strategy:
 * 1. Check for a static `tagName` property on any exported class.
 * 2. Fall back to the last segment of the module path (convention in this
 *    codebase: module path matches tag name,
 *    e.g. `.../mp-project-layout` → `mp-project-layout`).
 */
function getLayoutTagName(
  layoutModule: Record<string, unknown>,
  layoutPath: string,
): string {
  // Check for an explicit static tagName on an exported class.
  for (const value of Object.values(layoutModule)) {
    if (typeof value !== 'function') {
      continue;
    }
    const maybeTagName = (value as any).tagName;
    if (typeof maybeTagName === 'string') {
      return maybeTagName;
    }
  }

  // Convention: last path segment is the tag name.
  return layoutPath.split('/').pop()!;
}
