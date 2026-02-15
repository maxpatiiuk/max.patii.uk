import { join } from 'node:path';

import type { Plugin, ViteDevServer } from 'vite';

import type { ForgeConfig, PageMetadata } from './types.js';
import { generateSite } from './pages/generator.js';
import { pagesDirectory } from './const.js';
import { markdownToHtml } from './markdown/scanner.js';
import { readFile } from 'node:fs/promises';

/**
 * Create the static-site-forge Vite plugin.
 *
 * @public
 * @param config - The forge configuration.
 */
export function useStaticSiteForge(config: ForgeConfig): Plugin {
  return {
    name: 'static-site-forge',

    configureServer(server): void {
      setupDevServer(server, config);
    },

    async writeBundle(): Promise<void> {
      await generateSite(config);
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

      // Home page
      if (url === '/' || url === '/index.html') {
        const html = config.renderIndex();
        res.setHeader('Content-Type', 'text/html');
        res.end(html);
        return;
      }

      // Collection pages
      const resolvedPage = resolveCollectionPage(url, config.collections);
      if (resolvedPage !== undefined) {
        const { name, slug, metadata } = resolvedPage;
        const content = await readFile(
          `${pagesDirectory}/${name}/${slug}.md`,
          'utf-8',
        );
        const html = config.renderPage({
          slug,
          metadata,
          content: markdownToHtml(content),
        });
        res.setHeader('Content-Type', 'text/html');
        res.end(html);
        return;
      }

      next();
    };

    handleRequest().catch(next);
  });

  // Watch content files for live reload
  const contentGlob = join(pagesDirectory, '**/*.md');
  server.watcher.add(contentGlob);

  server.watcher.on('change', (changedPath) => {
    if (changedPath.endsWith('.md')) {
      server.ws.send({ type: 'full-reload' });
    }
  });
}

function resolveCollectionPage(
  url: string,
  collections: ForgeConfig['collections'],
): { name: string; slug: string; metadata: PageMetadata } | undefined {
  for (const [name, collection] of Object.entries(collections)) {
    const prefix = `/${name}/`;
    if (url.startsWith(prefix)) {
      const slug = url.slice(prefix.length).replace(/\/$/u, '') || 'index';
      if (Object.hasOwn(collection, slug)) {
        return { name, slug, metadata: collection[slug] };
      }
    }
  }

  return undefined;
}
