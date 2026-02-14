import { join } from 'node:path';

import type { Plugin, ViteDevServer } from 'vite';

import type { ForgeConfig, PageData } from './types.js';
import { resolvePages } from './pages/resolver.js';
import { generateSite } from './pages/generator.js';

/**
 * Serve generated HTML during development via Vite's middleware.
 */
function setupDevServer(server: ViteDevServer, config: ForgeConfig): void {
  const getPages = (): readonly PageData[] => resolvePages(config.contentDir);

  // Serve generated pages
  server.middlewares.use((req, res, next) => {
    const url = req.url ?? '/';
    const pages = getPages();

    // Home page
    if (url === '/' || url === '/index.html') {
      const html = config.renderIndex(pages);
      res.setHeader('Content-Type', 'text/html');
      res.end(html);
      return;
    }

    // Project pages: /projects/<slug>/ or /projects/<slug>
    const projectMatch = url.match(/^\/projects\/([^/]+)\/?$/u);
    if (projectMatch !== null) {
      const slug = projectMatch[1];
      const page = pages.find((p) => p.frontmatter.slug === slug);
      if (page !== undefined) {
        const html = config.renderPage(page);
        res.setHeader('Content-Type', 'text/html');
        res.end(html);
        return;
      }
    }

    next();
  });

  // Watch content files for live reload
  const contentGlob = join(config.contentDir, '**/*.md');
  server.watcher.add(contentGlob);

  server.watcher.on('change', (changedPath) => {
    if (changedPath.endsWith('.md')) {
      server.ws.send({ type: 'full-reload' });
    }
  });
}

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

    closeBundle(): void {
      const pages = resolvePages(config.contentDir);
      generateSite(config, pages);
    },
  };
}
