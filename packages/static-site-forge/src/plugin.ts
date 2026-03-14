import { readFile } from 'node:fs/promises';
import { pipeline } from 'node:stream/promises';
import { isRunnableDevEnvironment, type Plugin, type UserConfig } from 'vite';
import type { Collection, ForgeConfig, ResolvedPage } from './types.ts';
import { createDebug } from './debug.ts';
import { pathToFileURL } from 'node:url';
import { markdownToJs } from './markdown/markdownToJs.ts';
import { fullCollectionsPath, fullPagesDirectory, root } from './const.ts';
import { register } from 'node:module';

const debugTransform = createDebug('transform');
const ssrOutPath = `node_modules/.cache/static-site-forge/dist-ssr/`;

/**
 * @public
 * @param config
 */
export function useStaticSiteForge(
  config: ForgeConfig,
): [Plugin, Plugin, Plugin, Plugin] {
  let isServe = false;
  let clientEntries: Record<string, string> | undefined;
  const indexedPages: Record<
    string,
    Pick<ResolvedPage, 'collectionName' | 'metadata' | 'slug'>
  > = {};

  const orchestratorPlugin: Plugin = {
    name: '@maxpatiiuk/static-site-forge:orchestrator',
    sharedDuringBuild: true,
    config(_config, env): UserConfig {
      if (env.command === 'serve') {
        isServe = true;
      }
      return {
        /**
         * What SSR hydrate frameworks do:
         *
         * - Build all entries as .js for the client
         * - In parallel, pre-render all entries on the server to .html
         * - Connect the two into .html files that imports the client JS
         * - The browser gets the .html, and hydrates it using the client JS
         *
         * If they don't pre-render to static files, then they only do the
         * client build ahead of time, and the ssr build is started as a
         * production server, which server-side renders the components on the fly.
         *
         * With static-site-forge, I don't want to require a server - I want to
         * emit static HTML files that are cheap to host. I don't want hydration
         * as it adds complexity and hydration mismatches. I don't want to send
         * any client JS by default. If I don't need on the fly server-side
         * rendering, I can do a simpler architecture:
         *
         * - On the server pre-render all .md to .html. If there is any client
         *   JS ("islands"), then externalize it.
         * - Then do a client build. If the emitted .html has no .js, this is
         *   just a trivial passthrough. Otherwise, it bundles in any .js that
         *   was externalized on the server.
         */
        builder: {
          buildApp: async (builder): Promise<void> => {
            await builder.build(builder.environments.ssr);
            await builder.build(builder.environments.client);
          },
          sharedConfigBuild: true,
          sharedPlugins: true,
        },
        environments: {
          ssr: {
            build: {
              outDir: ssrOutPath,
              copyPublicDir: false,
              cssMinify: false,
              reportCompressedSize: false,
              rollupOptions: {
                // Set to empty object to prevent default index.html behavior
                // Will be overwritten by the plugin's options() hook
                input: {},
              },
            },
          },
          client: {
            build: {
              rollupOptions: {
                input: {},
              },
              reportCompressedSize: false,
            },
          },
        },
        css: {
          // Provide inline config to avoid file system config lookup (which
          // throws an exception, making it harder to debug with breakpoint
          // on "Caught Exceptions")
          postcss: {},
        },
      };
    },

    configureServer(server): void {
      const ssrEnvironment = server.environments.ssr;
      if (!isRunnableDevEnvironment(ssrEnvironment)) {
        return;
      }
      const runner = ssrEnvironment.runner;

      async function fetchCollections(): Promise<Record<string, Collection>> {
        const collectionsModule: unknown =
          await runner.import(fullCollectionsPath);
        return parseCollectionsModule(collectionsModule);
      }

      server.middlewares.use(
        (request, response, next) =>
          // Fetch collections.ts on each request. If it didn't change, Vite
          // caches it
          void fetchCollections()
            .then(async (collections) => {
              const resolved = resolveUrlToPage(
                request.url ?? '/',
                collections,
              );

              if (resolved === undefined) {
                return next();
              }

              const requestId = `${resolved.collectionName === '' ? '' : `${resolved.collectionName}/`}${resolved.slug}.md?mp`;
              indexedPages[requestId] = resolved;
              const module: unknown = await runner.import(requestId);
              const rawHtml = await renderModule(module);

              const html = await server.transformIndexHtml(
                request.url ?? '/',
                rawHtml,
              );
              response.setHeader('Content-Type', 'text/html');
              await pipeline(html, response);
            })
            .catch((error) => {
              console.error(
                `[static-site-forge] Failed to render ${request.url}:`,
                error,
              );
              response.statusCode = 500;
              response.end(`Internal Server Error: ${String(error)}`);
            }),
      );
    },
  };

  const ssrPlugin: Plugin = {
    name: '@maxpatiiuk/static-site-forge:ssr',
    sharedDuringBuild: true,
    applyToEnvironment: (environment) => environment.name === 'ssr',

    async options(options) {
      if (isServe) {
        return;
      }

      // Extract into a variable to avoid Vite rewriting the module
      const cssLoaderPath = './cssLoader.js';
      register(new URL(cssLoaderPath, import.meta.url));

      // Can't use environment.server.runner.import because .runner. exists in
      // dev server only.
      // Importing a .ts file is fine in Node.js 24+.
      // Main thing is that Vite-specific features are not available
      // (?raw, plugins don't run, import.meta.glob), which is fine as this
      // file is just an object full of static data.
      const collections = parseCollectionsModule(
        await import(pathToFileURL(fullCollectionsPath).href),
      );
      const ssrEntries: Record<string, string> = {};
      clientEntries = {};
      for (const [collectionName, collection] of Object.entries(collections)) {
        const prefix = collectionName === '' ? '' : `${collectionName}/`;

        for (const [slug, metadata] of Object.entries(collection.pages)) {
          if (metadata.externalUrl !== undefined) {
            continue;
          }
          const path = prefix + slug;
          const requestId = `${prefix}${slug}.md?mp`;
          // TODO: is it auto-watching these or need to remove ?mp
          const indexSuffix = slug === 'index' ? '' : '/index';
          const indexPath = path + indexSuffix;
          const htmlPath = `${indexPath}.html`;
          // TODO: is it auto-watching these or need to remove ?mp
          ssrEntries[indexPath] = requestId;
          // Vite's .html files output destination is based on the file name,
          // not the key in the input object. That is why we need to point to
          // non-existent .html path here. Can't path relative path either
          // because if the file by such name exists in current folder, Vite
          // will resolve the path to absolute, leaving some paths absolute and
          // some relative - best to force fake absolute for all here, and
          // strip it off when doing readFile() in load().
          clientEntries[htmlPath] = root + htmlPath;
          indexedPages[requestId] = {
            collectionName,
            slug,
            metadata,
          };
        }
      }
      options.input = ssrEntries;
    },

    buildStart(): void {
      // TODO: test build --watch
      this.addWatchFile(fullCollectionsPath);
    },

    resolveId: {
      // Execute before our "externalize all" plugin
      order: 'pre',
      filter: { id: /\.md\?mp$/u },
      handler(id): string {
        return `${fullPagesDirectory}${id}`;
      },
    },
    load: {
      filter: { id: /\.md\?mp$/u },
      async handler(fullId): Promise<string | undefined> {
        const pageMetadata =
          indexedPages[fullId.slice(fullPagesDirectory.length)];
        const id = fullId.slice(0, -'?mp'.length);
        const content =
          pageMetadata.metadata.hasMarkdownContent === false
            ? ''
            : await readFile(id, 'utf8');
        const transformed = markdownToJs(
          content,
          id,
          pageMetadata,
          isServe,
          config,
        );
        debugTransform?.(`${id}: ${transformed}`);
        return transformed;
      },
    },

    hotUpdate({ modules, server }): never[] | void {
      if (modules.length === 0) {
        return;
      }
      // Could walk the modules[].importers to collect affected .md?mp pages
      // and send a custom forge:update event to the client with just the list
      // of affected pages. then the client can use import.meta.hot to check in
      // that event if current page is affected. pros: edits that dont affect
      // open browser page wont trigger reload. cons: complexity, and possibly
      // stale state for any client-side JS code - they may require separate HMR
      // support. Not much gain at present given these are simple static pages.
      server.environments.client.hot.send({ type: 'full-reload' });
      return [];
    },
  };
  const ssrExternalizePlugin: Plugin = {
    name: '@maxpatiiuk/static-site-forge:ssr-externalize',
    sharedDuringBuild: true,
    apply: 'build',
    applyToEnvironment: (environment) => environment.name === 'ssr',

    resolveId: {
      // Execute before Vite's default resolveId behavior
      order: 'pre',
      filter: {
        id: {
          exclude: [/^[\./]/u, ...(config.ssrBundleIn ?? [])],
        },
      },
      handler(id) {
        return { id, external: true };
      },
    },
  };

  const clientPlugin: Plugin = {
    name: '@maxpatiiuk/static-site-forge:client',
    sharedDuringBuild: true,
    applyToEnvironment: (environment) => environment.name === 'client',

    options(options) {
      if (isServe) {
        return;
      }
      options.input = clientEntries;
    },

    resolveId: {
      filter: { id: /\.html$/u },
      handler(id): string {
        return id;
      },
    },

    load: {
      // Can't use ?mp prefix because vite:build-html expects .html$
      filter: { id: /\.html$/u },
      async handler(id): Promise<string | undefined> {
        const jsPath = `${id.slice(root.length, -'.html'.length)}.js`;
        const module: unknown = await import(
          pathToFileURL(ssrOutPath + jsPath).href
        );
        const rawHtml = await renderModule(module);
        // Vite calls .transformIndexHtml
        return rawHtml;
      },
    },
  };

  return [orchestratorPlugin, ssrPlugin, ssrExternalizePlugin, clientPlugin];
}

function parseCollectionsModule(
  collectionsModule: unknown,
): Record<string, Collection> {
  if (
    typeof collectionsModule !== 'object' ||
    collectionsModule === null ||
    !('collections' in collectionsModule) ||
    typeof collectionsModule.collections !== 'object'
  ) {
    throw Error('collections module must export an object named collections');
  }
  return collectionsModule.collections as Record<string, Collection>;
}

async function renderModule(module: unknown): Promise<string> {
  if (
    typeof module !== 'object' ||
    module === null ||
    !('render' in module) ||
    typeof module.render !== 'function'
  ) {
    throw Error(
      'Expected the virtual .md module to export a function named render()',
    );
  }
  const renderer = module.render as () => Promise<string>;
  const rawHtml = await renderer();
  return rawHtml;
}

const debugResolve = createDebug('resolve');
/**
 * Map a request URL to a page in the collections.
 *
 * Routing rules:
 * - The `` (root) collection owns top-level URLs: `/` → slug `index`, `/foo/` → slug `foo`.
 * - Named collections own their prefix: `/projects/bar/` → collection `projects`, slug `bar`.
 */
function resolveUrlToPage(
  url: string,
  collections: Record<string, Collection>,
): ResolvedPage | undefined {
  // Strip query string, hash, and leading slash
  const pathname = url.split(/[?#]/u)[0].slice('/'.length);
  // Force ending slash
  const normalized = pathname.endsWith('/') ? pathname : `${pathname}/`;
  debugResolve?.(`Resolving ${normalized}`);

  debugger;
  for (const [collectionName, collection] of Object.entries(collections)) {
    const prefix = collectionName === '' ? '' : `${collectionName}/`;
    if (!normalized.startsWith(prefix)) {
      continue;
    }

    const withoutPrefix = normalized.slice(prefix.length);
    const slug =
      withoutPrefix === '/' || withoutPrefix === ''
        ? 'index'
        : withoutPrefix.slice(0, -'/'.length);
    if (Object.hasOwn(collection.pages, slug)) {
      const page = collection.pages[slug];
      if (page.externalUrl !== undefined) {
        continue;
      }
      debugResolve?.(
        `Resolved to collection "${collectionName}", slug "${slug}"`,
      );
      return {
        collectionName,
        slug,
        metadata: page,
        collection,
      };
    }
  }

  return;
}
