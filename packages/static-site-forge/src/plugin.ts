import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

import type { Plugin, ViteDevServer } from 'vite';

import type { ForgeConfig, PageMetadata } from './types.js';
import { transformMarkdown } from './transform.js';
import { renderToString } from './ssr.js';

/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unnecessary-condition, @typescript-eslint/prefer-optional-chain, no-await-in-loop */

/**
 * Create the static-site-forge Vite plugin.
 *
 * @public
 * @param config - The forge configuration.
 */
export function useStaticSiteForge(config: ForgeConfig): Plugin {
  let outDir = 'dist';

  return {
    name: 'static-site-forge',

    configResolved(resolvedConfig): void {
      outDir = resolvedConfig.build.outDir;
      (config as any).resolvedConfig = resolvedConfig;
    },

    transform(code, id): string | null {
      if (id.endsWith('.md')) {
        return transformMarkdown(code);
      }
      return null;
    },

    configureServer(server): void {
      setupDevServer(server, config);
    },

    async writeBundle(): Promise<void> {
      const resolvedConfig = (config as any).resolvedConfig;
      const ssrEnvironment = resolvedConfig.environments?.ssr;
      if (!ssrEnvironment) {
        return;
      }

      for (const [collectionName, collection] of Object.entries(
        config.collections,
      )) {
        for (const [slug, metadata] of Object.entries(collection)) {
          const isRoot =
            collectionName === 'pages' || collectionName === 'root';
          const url = isRoot
            ? slug === 'index'
              ? '/'
              : `/${slug}/`
            : `/${collectionName}/${slug}/`;

          const mdPath = isRoot
            ? `/src/pages/${slug}.md`
            : `/src/pages/${collectionName}/${slug}.md`;

          try {
            // 1. Load the markdown module
            const mdModule = await ssrEnvironment.runModule(mdPath);
            const contentTemplate = mdModule.render(config.siteConfig);

            // 2. Load the layout module
            const layoutModule = await metadata.layout();
            const finalTemplate = layoutModule.renderLayout(
              contentTemplate,
              metadata,
              config.siteConfig,
            );
            const finalHtml = await renderToString(finalTemplate);

            // 3. Write to file
            const outputPath =
              isRoot && slug === 'index'
                ? join(outDir, 'index.html')
                : join(outDir, url, 'index.html');

            await mkdir(dirname(outputPath), { recursive: true });
            await writeFile(outputPath, finalHtml, 'utf-8');
            console.log(`Generated ${outputPath}`);
          } catch (e) {
            console.error(`Failed to generate ${url}:`, e);
          }
        }
      }
    },
  };
}

/**
 * Serve generated HTML during development via Vite's middleware.
 */
function setupDevServer(server: ViteDevServer, config: ForgeConfig): void {
  // Serve generated pages
  server.middlewares.use((req, res, next) => {
    const handleRequest = async (): Promise<void> => {
      const url = req.url ?? '/';

      let resolvedPage: { slug: string; metadata: PageMetadata } | undefined;

      // Home page
      const homeCollection =
        config.collections.pages ?? config.collections.root;
      if (url === '/' || url === '/index.html') {
        if (homeCollection && homeCollection.index) {
          resolvedPage = { slug: 'index', metadata: homeCollection.index };
        }
      } else {
        resolvedPage = resolveCollectionPage(url, config.collections);
      }

      if (resolvedPage !== undefined) {
        const { slug, metadata } = resolvedPage;

        // Find the .md file path.
        // Assuming pages are in src/pages/
        const isProject = url.startsWith('/projects/');
        const mdPath = isProject
          ? `/src/pages/projects/${slug}.md`
          : `/src/pages/${slug}.md`;

        try {
          // 1. Load the markdown module
          const mdModule = await (server as any).ssrLoadModule(mdPath);
          const contentTemplate = mdModule.render(config.siteConfig);

          // 2. Load the layout module
          const layoutModule = await metadata.layout();

          // Layout module exports a renderLayout(content, metadata, siteConfig) function
          const finalTemplate = layoutModule.renderLayout(
            contentTemplate,
            metadata,
            config.siteConfig,
          );
          const finalHtml = await renderToString(finalTemplate);

          res.setHeader('Content-Type', 'text/html');
          res.end(finalHtml);
          return;
        } catch (e) {
          console.error(`Failed to render ${url}:`, e);
          res.statusCode = 500;
          res.end(
            `Internal Server Error: ${e instanceof Error ? e.message : String(e)}`,
          );
          return;
        }
      }

      next();
    };

    handleRequest().catch(next);
  });

  server.watcher.on('change', (changedPath) => {
    if (changedPath.endsWith('.md')) {
      server.ws.send({ type: 'full-reload' });
    }
  });
}

function resolveCollectionPage(
  url: string,
  collections: ForgeConfig['collections'],
): { slug: string; metadata: PageMetadata } | undefined {
  for (const [name, collection] of Object.entries(collections)) {
    if (name === 'pages' || name === 'root') {
      continue;
    }
    const prefix = `/${name}/`;
    if (url.startsWith(prefix)) {
      const slug = url.slice(prefix.length).replace(/\/$/u, '') || 'index';
      if (Object.hasOwn(collection, slug)) {
        return { slug, metadata: collection[slug] };
      }
    }
  }

  return undefined;
}
