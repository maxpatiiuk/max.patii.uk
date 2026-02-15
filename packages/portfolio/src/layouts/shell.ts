import { html, type TemplateResult } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import type { PageMetadata } from '@maxpatiiuk/static-site-forge';

/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */

export function renderShell(
  content: TemplateResult,
  metadata: PageMetadata,
  siteConfig: any,
): TemplateResult {
  const fullTitle =
    metadata.title === siteConfig.title
      ? siteConfig.title
      : `${metadata.title} | ${siteConfig.title}`;
  const desc = metadata.description ?? siteConfig.description;

  const head = `
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${fullTitle}</title>
  <meta name="description" content="${desc}">
  <meta name="author" content="${siteConfig.author}">
  <meta name="keywords" content="${siteConfig.keywords}">
  <meta name="theme-color" content="${siteConfig.themeColor}">
  <meta name="color-scheme" content="dark">
  <meta name="robots" content="index, follow">
  <meta property="og:title" content="${fullTitle}">
  <meta property="og:description" content="${desc}">
  <meta property="og:type" content="website">
  ${metadata.ogImage !== undefined ? `<meta property="og:image" content="${siteConfig.baseUrl}${metadata.ogImage}">` : ''}
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="${siteConfig.twitter}">
  <meta name="twitter:creator" content="${siteConfig.twitter}">
  <link rel="manifest" href="/manifest.webmanifest">
  <link rel="stylesheet" href="/styles/global.css">
  <script type="module" src="/src/entry.ts"></script>
  <script async src="https://www.googletagmanager.com/gtag/js?id=${siteConfig.googleAnalyticsId}"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${siteConfig.googleAnalyticsId}');
  </script>
  `;

  return html`<head>
      ${unsafeHTML(head)}
    </head>
    <body>
      ${content}
    </body>`;
}
