import { writeFile, mkdir, readFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';

import type { ForgeConfig } from '../types.js';
import { outDirectory, pagesDirectory } from '../const.js';
import { markdownToHtml } from '../markdown/scanner.js';

/**
 * Generate all static HTML pages and copy assets to the output directory.
 */
export async function generateSite(config: ForgeConfig): Promise<void> {
  const { additionalPages, collections } = config;

  // Ensure output directory exists
  await mkdir(outDirectory, { recursive: true });

  // Generate collection pages
  const collectionTasks = Object.entries(collections).flatMap(
    ([collectionName, collection]) =>
      Object.entries(collection).map(async ([slug, metadata]) => {
        const pageDir = join(outDirectory, collectionName, slug);
        await mkdir(pageDir, { recursive: true });

        const markdownFile = `${pagesDirectory}/${collectionName}/${slug}.md`;
        const rawContent = await readFile(markdownFile, 'utf-8');
        const html = config.renderPage({
          slug,
          metadata,
          content: markdownToHtml(rawContent),
        });
        await writeFile(join(pageDir, 'index.html'), html, 'utf-8');
      }),
  );

  await Promise.all(collectionTasks);

  // Generate index page
  const indexHtml = config.renderIndex();
  const indexPath = join(outDirectory, 'index.html');

  // Generate 404 page
  const notFoundHtml = config.render404();
  const notFoundPath = join(outDirectory, '404.html');

  await Promise.all([
    writeFile(indexPath, indexHtml, 'utf-8'),
    writeFile(notFoundPath, notFoundHtml, 'utf-8'),
  ]);

  // Generate additional pages
  if (additionalPages !== undefined) {
    await Promise.all(
      additionalPages.map(async ({ path, html }) => {
        const filePath = join(outDirectory, path);
        await mkdir(dirname(filePath), { recursive: true });
        await writeFile(filePath, html, 'utf-8');
      }),
    );
  }
}
