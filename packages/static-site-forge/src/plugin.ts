import { join } from 'node:path';

import type { Plugin, ViteDevServer } from 'vite';

import type { ForgeConfig } from './types.js';
import { generateSite } from './pages/generator.js';
import { pagesDirectory } from './const.js';
import { markdownToHtml } from './markdown/scanner.js';

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
  server.middlewares.use(async (req, res, next) => {
    const url = req.url ?? '/';

    // Home page
    if (url === '/' || url === '/index.html') {
      const html = config.renderIndex(config.collections);
      res.setHeader('Content-Type', 'text/html');
      res.end(html);
      return;
    }

    // Collection pages
    for (const collection of config.collections) {
      const prefix = `/${collection.name}/`;
      if (url.startsWith(prefix)) {
        const slug = url.slice(prefix.length).replace(/\/$/u, '') || 'index';
        const item = collection.items.find((i) => i.metadata.slug === slug);
        if (item !== undefined) {
          const rawContent = await item.content();
          const html = config.renderPage({
            metadata: item.metadata,
            content: markdownToHtml(rawContent),
          });
          res.setHeader('Content-Type', 'text/html');
          res.end(html);
          return;
        }
      }
    }

    next();
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
