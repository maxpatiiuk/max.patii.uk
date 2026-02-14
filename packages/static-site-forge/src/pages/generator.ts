import { writeFileSync, mkdirSync, cpSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';

import type { ForgeConfig, PageData } from '../types.js';

/**
 * Generate all static HTML pages and copy assets to the output directory.
 *
 * @public
 * @param config - The forge configuration.
 * @param pages - The list of pages to generate.
 */
export function generateSite(
  config: ForgeConfig,
  pages: readonly PageData[],
): void {
  const { outDir, publicDir, additionalPages } = config;

  // Ensure output directory exists
  mkdirSync(outDir, { recursive: true });

  // Generate project pages
  for (const page of pages) {
    const pageDir = join(outDir, 'projects', page.frontmatter.slug);
    mkdirSync(pageDir, { recursive: true });

    const html = config.renderPage(page);
    writeFileSync(join(pageDir, 'index.html'), html, 'utf-8');
  }

  // Generate index page
  const indexHtml = config.renderIndex(pages);
  writeFileSync(join(outDir, 'index.html'), indexHtml, 'utf-8');

  // Generate 404 page
  const notFoundHtml = config.render404();
  writeFileSync(join(outDir, '404.html'), notFoundHtml, 'utf-8');

  // Generate additional pages
  if (additionalPages !== undefined) {
    for (const { path, html } of additionalPages) {
      const filePath = join(outDir, path);
      mkdirSync(dirname(filePath), { recursive: true });
      writeFileSync(filePath, html, 'utf-8');
    }
  }

  // Copy public assets
  if (existsSync(publicDir)) {
    cpSync(publicDir, outDir, { recursive: true });
  }
}
