import { join } from 'node:path';
import {
  fullCollectionsPath,
  fullPagesDirectory,
  fullPublicDir,
} from '../const.ts';
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
  const relativeFilePath = filePath.slice(fullPagesDirectory.length);
  const lastSlash = relativeFilePath.lastIndexOf('/');
  const relativeDirectory =
    lastSlash === -1 ? '' : relativeFilePath.slice(0, lastSlash);

  const hasJsHeader = content.startsWith('```');
  const jsHeaderEnd = hasJsHeader ? content.indexOf('\n```\n', 3) : -1;
  let webComponentImports = '';
  const jsHeader = hasJsHeader
    ? content.slice(content.indexOf('\n') + 1, jsHeaderEnd + 1)
    : '';
  const bodyContent = hasJsHeader
    ? content.slice(jsHeaderEnd + '\n```\n'.length)
    : content;
  let ogImage: string | undefined;
  let ogImageAlt: string | undefined;
  const litHtml = markdownToLitHtml(bodyContent, {
    resolveImageUrl(url, alt) {
      const resolvedPath = resolveAssetUrl(url, filePath);
      if (ogImage === undefined) {
        ogImage = resolvedPath;
        ogImageAlt = alt;
      }
      return resolveAssetUrl(url, filePath);
    },
    onWebComponentTag(tagName) {
      const importPath = config.getWebComponentImportPath(tagName);
      webComponentImports += `import "${importPath}";\n`;
    },
    isInline: false,
  });

  const templateString = litHtml === '' ? '' : `html\`${litHtml}\``;

  // Wrap the module in a function rather than execute immediately
  // so that `new Date()` is fresh on each request
  const module = `${isServe ? `import "@maxpatiiuk/static-site-forge/litHmrPatch.js";` : ''}
${webComponentImports}\
import { renderPage } from "@maxpatiiuk/static-site-forge/runtime.js";
import { html } from "lit";

import { content } from "${fullCollectionsPath}";
const collection = content.collections["${resolvedPage.collectionName}"];
const page = collection.pages["${resolvedPage.slug}"];
page.ogImage ??= ${ogImage === undefined ? 'content.defaultOgImage' : JSON.stringify(ogImage)};
page.ogImageAlt ??= ${ogImageAlt === undefined ? 'content.defaultOgImageAlt' : JSON.stringify(ogImageAlt)};
${jsHeader}\

export async function render() {
  return await renderPage(content.rootLayout, collection, page, ${templateString});
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
