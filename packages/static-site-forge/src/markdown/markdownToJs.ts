import { join } from 'node:path';
import { fullCollectionsPath, fullPublicDir } from '../const.ts';
import type { ForgeConfig, ResolvedPage } from '../types.ts';
import { markdownToLitHtml } from './markdownToLitHtml.ts';

/**
 * Transforms a Markdown file into a Lit-JS module.
 */
export function markdownToJs(
  content: string,
  filePath: string,
  resolvedPage: Pick<ResolvedPage, 'collectionName' | 'metadata' | 'slug'>,
  isServe: boolean,
  config: ForgeConfig,
): string {
  const hasJsHeader = content.startsWith('```');
  const jsHeaderEnd = hasJsHeader ? content.indexOf('\n```\n', 3) : -1;
  let webComponentImports = '';
  const jsHeader = hasJsHeader
    ? content.slice(content.indexOf('\n') + 1, jsHeaderEnd + 1)
    : '';
  const bodyContent = hasJsHeader
    ? content.slice(jsHeaderEnd + '\n```\n'.length)
    : content;
  const litHtml = markdownToLitHtml(bodyContent, {
    resolveImageUrl: (url, alt) => {
      if (resolvedPage.metadata.ogImage === undefined) {
        resolvedPage.metadata.ogImage = url;
        resolvedPage.metadata.ogImageAlt = alt;
      }
      return resolveAssetUrl(url, filePath);
    },
    onWebComponentTag(tagName) {
      const importPath = config.getWebComponentImportPath(tagName);
      webComponentImports += `import "${importPath}";\n`;
    },
  });

  const templateString = litHtml === '' ? '' : `html\`${litHtml}\``;

  // Wrap the module in a function rather than execute immediately
  // so that `new Date()` is fresh on each request
  const module = `${isServe ? `import "@maxpatiiuk/static-site-forge/litHmrPatch.js";` : ''}
${webComponentImports}\
import { renderPage } from "@maxpatiiuk/static-site-forge/runtime.js";
import { html } from "lit";

import { collections, rootLayout } from "${fullCollectionsPath}";
const collection = collections["${resolvedPage.collectionName}"];
const page = collection.pages["${resolvedPage.slug}"];
${jsHeader}

export async function render() {
  return await renderPage(rootLayout, collection, page, ${templateString});
}`;

  return module;
}

function resolveAssetUrl(url: string, filePath: string): string {
  if (url.startsWith('.')) {
    const absolute = join(filePath, '..', url);
    if (!absolute.startsWith(fullPublicDir)) {
      throw Error(
        `Resolved image URL ${absolute} is outside of public directory`,
      );
    }
    return `/${absolute.slice(fullPublicDir.length)}`;
  } else {
    return url;
  }
}
