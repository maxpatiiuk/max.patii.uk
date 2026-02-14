import { writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';

import type { ForgeConfig } from '../types.js';
import { outDirectory } from '../const.js';
import { markdownToHtml } from '../markdown/scanner.js';

/**
 * Generate all static HTML pages and copy assets to the output directory.
 *
 * @public
 * @param config - The forge configuration.
 */
export async function generateSite(config: ForgeConfig): Promise<void> {
  const { additionalPages, collections } = config;

  // Ensure output directory exists
  mkdirSync(outDirectory, { recursive: true });

  // Generate collection pages
  for (const collection of collections) {
    for (const item of collection.items) {
      const pageDir = join(outDirectory, collection.name, item.metadata.slug);
      mkdirSync(pageDir, { recursive: true });

      const rawContent = await item.content();
      const html = config.renderPage({
        metadata: item.metadata,
        content: markdownToHtml(rawContent),
      });
      writeFileSync(join(pageDir, 'index.html'), html, 'utf-8');
    }
  }

  // Generate index page
  const indexHtml = config.renderIndex(collections);
  writeFileSync(join(outDirectory, 'index.html'), indexHtml, 'utf-8');

  // Generate 404 page
  const notFoundHtml = config.render404();
  writeFileSync(join(outDirectory, '404.html'), notFoundHtml, 'utf-8');

  // Generate additional pages
  if (additionalPages !== undefined) {
    for (const { path, html } of additionalPages) {
      const filePath = join(outDirectory, path);
      mkdirSync(dirname(filePath), { recursive: true });
      writeFileSync(filePath, html, 'utf-8');
    }
  }
}
