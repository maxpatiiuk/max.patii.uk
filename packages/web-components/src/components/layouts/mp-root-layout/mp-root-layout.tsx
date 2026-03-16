import { LitElement, property } from '@arcgis/lumina';
import type { TemplateResult } from 'lit';
import { html as ssrHtml } from '@lit-labs/ssr';
import type { LayoutBase } from '../types';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

/** @public */
export interface SiteConfig {
  /** @public */
  readonly title: string;
  /** @public */
  readonly description: string;
  /** @public */
  readonly keywords: string;
  /** @public */
  readonly author: string;
  /** @public */
  readonly themeColor: string;
  /** @public */
  readonly googleAnalyticsId?: string;
  /** @public */
  readonly twitter?: string;
}

/** @public */
export interface RootLayoutMetadata {
  /** @public */
  readonly title: string;
  /** @public */
  readonly description?: string;
  /** @public */
  readonly ogImage?: string;
  /** @public */
  readonly ogImageAlt?: string;
  /** @public */
  readonly siteConfig: SiteConfig;
  /** @public */
  readonly date?: string;
  /** @public */
  readonly canonicalUrl?: string;
}

declare global {
  interface DeclareElements {
    'mp-root-layout': MpRootLayout;
  }
}

/** @public */
export class MpRootLayout extends LitElement implements LayoutBase {
  //#region Public Properties

  /** @public */
  @property() layoutData?: RootLayoutMetadata;

  /** @public */
  @property() slotted?: TemplateResult;

  //#endregion

  //#region Rendering

  override render(): TemplateResult {
    const layoutData = this.layoutData!;
    const { siteConfig } = layoutData;

    const fullTitle =
      layoutData.title === siteConfig.title
        ? siteConfig.title
        : `${layoutData.title} | ${siteConfig.title}`;
    const description = layoutData.description ?? siteConfig.description;

    const head = ssrHtml`\
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${fullTitle}</title>
  <meta name="description" content="${description}">
  <meta name="author" content="${siteConfig.author}">
  <meta name="keywords" content="${siteConfig.keywords}">
  <meta name="theme-color" content="${siteConfig.themeColor}">
  <meta name="color-scheme" content="dark">
  <meta name="robots" content="index, follow">
  <meta name="application-name" content="${siteConfig.author}">
  <meta name="creator" content="${siteConfig.author}">
  <meta property="og:site_name" content="${siteConfig.author}">
  <meta property="og:title" content="${fullTitle}">
  <meta property="og:description" content="${description}">
  <meta property="og:type" content="${layoutData.date === undefined ? 'website' : 'article'}">
${layoutData.date !== undefined ? ssrHtml`  <meta property="article:published_time" content="${layoutData.date}">\n` : ''}\
  <meta name="generator" content="https://github.com/maxpatiiuk/max.patii.uk/tree/main/packages/static-site-forge" >
${layoutData.ogImage !== undefined ? ssrHtml`  <meta property="og:image" content="${layoutData.ogImage}">\n` : ''}\
${layoutData.ogImageAlt !== undefined ? ssrHtml`  <meta property="og:image:alt" content="${layoutData.ogImageAlt}">\n` : ''}\
${layoutData.canonicalUrl !== undefined ? ssrHtml`  <meta property="og:url" content="${layoutData.canonicalUrl}">\n` : ''}\
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="${siteConfig.twitter}">
  <meta name="twitter:creator" content="${siteConfig.twitter}">
  <link rel="icon" href="/icon1.png" type="image/png" sizes="32x32">
  <link rel="icon" href="/icon2.png" type="image/png" sizes="192x192">
  <link rel="icon" href="/icon3.png" type="image/png" sizes="512x512">
  <link rel="apple-touch-icon" href="/apple-icon.png" type="image/png" sizes="180x180">
  <link rel="manifest" href="/manifest.webmanifest">
${layoutData.canonicalUrl !== undefined ? ssrHtml`  <link rel="canonical" href="${layoutData.canonicalUrl}">\n` : ''}\
  ${
    process.env.NODE_ENV === 'production'
      ? unsafeHTML(`<script async src="https://www.googletagmanager.com/gtag/js?id=${siteConfig.googleAnalyticsId}"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${siteConfig.googleAnalyticsId}');
  </script>`)
      : ''
  }
  `;

    return ssrHtml`<!DOCTYPE html><html lang="en-US"><head>
${head}
</head><body style="margin:0;font-size:112.5%">
${this.slotted}
</body></html>`;
  }

  //#endregion
}
