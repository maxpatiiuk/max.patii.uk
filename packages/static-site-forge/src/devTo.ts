import {
  resolveMarkdownAnchorUrl,
  resolveMarkdownImageUrl,
} from './markdown/resolveMarkdownUrl.ts';
import { format } from 'prettier';

/** @public */
export type DevToMarkdownOptions = {
  /** @public */
  readonly canonicalBaseUrl: string;
  /** @public */
  readonly sourceFilePath: string;
};

/** @public */
export type DevToMarkdownResult = {
  /** @public */
  readonly markdown: string;
  /** @public */
  readonly warnings: readonly string[];
};

/**
 * Rewrites site-relative Markdown URLs so that the result can be published on
 * DEV.to, where relative URLs resolve against dev.to instead of this site.
 *
 * @public
 * @param markdown
 * @param options
 */
export async function markdownToDevTo(
  markdown: string,
  options: DevToMarkdownOptions,
): Promise<DevToMarkdownResult> {
  const warnings = collectDevToWarnings(markdown);
  const rewrittenMarkdown = markdown.replace(
    markdownUrl,
    (match: string, imageMarker: string, text: string, url: string) => {
      const rewrittenUrl = rewriteUrl(url, imageMarker === '!', options);
      return rewrittenUrl === url
        ? match
        : `${imageMarker}[${text}](${rewrittenUrl})`;
    },
  );

  return {
    markdown: await format(rewrittenMarkdown, {
      parser: 'markdown',
      proseWrap: 'never',
    }),
    warnings,
  };
}

function rewriteUrl(
  url: string,
  isImage: boolean,
  { canonicalBaseUrl, sourceFilePath }: DevToMarkdownOptions,
): string {
  const unwrappedUrl =
    url.startsWith('<') && url.endsWith('>') ? url.slice(1, -1) : url;

  if (unwrappedUrl.startsWith('/')) {
    return new URL(unwrappedUrl.slice(1), canonicalBaseUrl).href;
  }
  if (!unwrappedUrl.startsWith('.')) {
    return unwrappedUrl;
  }

  const [urlPath, suffix] = splitUrl(unwrappedUrl);
  const sitePath = isImage
    ? resolveMarkdownImageUrl(urlPath)
    : resolveMarkdownAnchorUrl(urlPath, sourceFilePath);

  return new URL(sitePath.slice(1), canonicalBaseUrl).href + suffix;
}

function splitUrl(url: string): readonly [string, string] {
  const queryIndex = url.search(/[?#]/u);
  return queryIndex === -1
    ? [url, '']
    : [url.slice(0, queryIndex), url.slice(queryIndex)];
}

function collectDevToWarnings(markdown: string): readonly string[] {
  const warnings = new Set<string>();

  for (const match of markdown.matchAll(webComponentTag)) {
    warnings.add(
      `DEV.to does not support the web component <${match[1]}>; replace it manually.`,
    );
  }
  if (videoTag.test(markdown)) {
    warnings.add(
      'Review <video> manually: keep it only after verifying DEV.to renders it, or replace it with a supported embed or link.',
    );
  }

  return [...warnings];
}

// The site parser accepts Markdown links with either a normal URL or an
// angle-bracket-wrapped URL. The latter permits parentheses in the URL.
const markdownUrl = /(!?)\[([^\]]*)\]\((<[^>]*>|[^)]*)\)/gu;
const webComponentTag = /<([a-z][\w]*-[\w-]*)(?:\s[^<>]*)?\s*\/?>/giu;
const videoTag = /<video(?:\s|>)/iu;
