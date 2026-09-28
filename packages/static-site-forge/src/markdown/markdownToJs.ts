import { readFileSync } from 'node:fs';
import { dirname, extname, relative, resolve } from 'node:path';
import { fullCollectionsPath, fullPagesDirectory } from '../const.ts';
import type { ForgeConfig, ResolvedPage } from '../types.ts';
import { resolveGitHubUrl, getRepositoryRoot } from '../utils/repository.ts';
import { markdownToLitHtml } from './markdownToLitHtml.ts';
import {
  resolveMarkdownAnchorUrl,
  resolveMarkdownImageUrl,
} from './resolveMarkdownUrl.ts';

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
  const repositoryRoot = getRepositoryRoot();

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
      const resolvedPath = resolveMarkdownImageUrl(url);
      if (url.startsWith('.') && ogImage === undefined) {
        ogImage = resolvedPath;
        ogImageAlt = alt;
      }
      return resolvedPath;
    },
    resolveAnchorUrl(url) {
      return resolveMarkdownAnchorUrl(url, filePath);
    },
    resolveEmbeddedFile(url) {
      const [fileUrl, region] = url.split('#');
      const absolutePath = resolve(dirname(filePath), fileUrl);
      const repositoryPath = relative(repositoryRoot, absolutePath);
      if (repositoryPath.startsWith('..') || repositoryPath === '') {
        throw Error(`Embedded file is outside the repository: ${url}`);
      }
      let fileContent = readFileSync(absolutePath, 'utf8');
      let githubFragment = '';
      if (region !== undefined) {
        const lines = fileContent.split('\n');
        const lineRange = /^L([1-9]\d*)-([1-9]\d*)$/.exec(region);
        if (lineRange !== null) {
          const start = Number(lineRange[1]);
          const end = Number(lineRange[2]);
          if (start > end || end > lines.length) {
            throw Error(`Line range "${region}" is outside ${url}`);
          }
          fileContent = lines.slice(start - 1, end).join('\n');
          githubFragment = `#L${start}-L${end}`;
        } else {
          const start = lines.findIndex((line) =>
            line.trimEnd().endsWith(`#region ${region}`),
          );
          const end = lines.findIndex(
            (line, index) =>
              index > start && line.trimEnd().endsWith('#endregion'),
          );
          if (start === -1 || end === -1) {
            throw Error(`Region "${region}" not found in ${url}`);
          }
          fileContent = lines.slice(start + 1, end).join('\n');
          githubFragment = `#L${start + 2}-L${end}`;
        }
      }
      return {
        content: fileContent,
        href: `${resolveGitHubUrl()}/blob/main/${repositoryPath.split('\\').join('/')}${githubFragment}`,
        language: extname(fileUrl).slice(1).toLowerCase() || 'text',
      };
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
