import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { markdownToDevTo } from '@maxpatiiuk/static-site-forge/devTo.js';
import type { Collection } from '@maxpatiiuk/static-site-forge/types.js';
import type { PostPageMetadata } from '@maxpatiiuk/web-components/components/mp-post-layout';
import { content } from '../src/collections.ts';

if (process.argv.length < 4) {
  throw Error(
    'Usage: node scripts/devTo.ts <collection-file.ts> <article-slug>',
  );
}
const [, , collectionFilePath, articleSlug] = process.argv;

const collectionModule = (await import(
  pathToFileURL(collectionFilePath).href
)) as unknown as Record<string, Collection<PostPageMetadata>>;
const collection = Object.values(collectionModule).find(({ pages }) =>
  Object.hasOwn(pages, articleSlug),
);
if (collection === undefined) {
  throw Error(
    `Article "${articleSlug}" was not found in ${collectionFilePath}.`,
  );
}
const metadata = collection.pages[articleSlug];

const sourceFilePath = resolve(
  dirname(collectionFilePath),
  `${articleSlug}.md`,
);
const sourceMarkdown = await readFile(sourceFilePath, 'utf8');
const { markdown, warnings } = await markdownToDevTo(sourceMarkdown, {
  canonicalBaseUrl: content.canonicalBaseUrl,
  sourceFilePath,
});

for (const warning of warnings) {
  console.error(`Warning: ${warning}`);
}
if (metadata.seriesName !== undefined) {
  console.error(
    `Warning: Set the DEV.to series manually to "${metadata.seriesName}".`,
  );
}

process.stdout.write(markdown);
