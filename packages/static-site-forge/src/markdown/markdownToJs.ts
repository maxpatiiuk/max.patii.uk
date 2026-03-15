import {
  fullCollectionsPath,
  fullPagesDirectory,
  relativePublicDir,
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

  const collectionUrl =
    resolvedPage.collectionName === '' ? '' : `${resolvedPage.collectionName}/`;
  const slugUrl = resolvedPage.slug === 'index' ? '' : `${resolvedPage.slug}/`;
  const rootRelativeUrl = `${collectionUrl}${slugUrl}`;
  const inferredFilePath = `${collectionUrl}${resolvedPage.slug}.md`;
  if (inferredFilePath !== relativeFilePath) {
    throw Error(
      `Resolved page URL does not match file path. Ensure collection name matches the collection file path. Resolved URL: ${rootRelativeUrl}, file path: ${relativeFilePath}`,
    );
  }

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
      if (url.charCodeAt(0) !== charCodeDot) {
        return url;
      }
      const pathStart = url.indexOf(relativePublicDir);
      if (pathStart === -1) {
        throw Error(
          `Image URL "${url}" does not contain expected public directory segment "${relativePublicDir}".`,
        );
      }
      const resolvedPath = url.slice(pathStart + relativePublicDir.length - 1);
      if (ogImage === undefined) {
        ogImage = resolvedPath;
        ogImageAlt = alt;
      }
      return resolvedPath;
    },
    resolveAnchorUrl(url) {
      if (url.charCodeAt(0) !== charCodeDot) {
        return url;
      }
      let draftPath = relativeDirectory;
      let startIndex = 0;
      if (url.startsWith('./')) {
        startIndex = './'.length;
      } else {
        while (url.startsWith('../', startIndex)) {
          startIndex += '../'.length;
          const lastSlash = draftPath.lastIndexOf('/');
          if (lastSlash === -1) {
            draftPath = '';
          } else {
            draftPath = draftPath.slice(0, lastSlash);
          }
        }
      }
      const trimmedUrl = url.endsWith('.md')
        ? url.slice(startIndex, -'.md'.length)
        : url.slice(startIndex);

      return `/${draftPath === '' ? '' : `${draftPath}/`}${trimmedUrl}`;
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
page.canonicalUrl ??= content.canonicalBaseUrl + ${JSON.stringify(rootRelativeUrl)};
${jsHeader}\

export async function render() {
  return await renderPage(content.rootLayout, collection, page, ${templateString});
}`;

  return module;
}

const charCodeDot = 46;
