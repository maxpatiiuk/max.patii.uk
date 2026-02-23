import { h, LitElement, property } from '@arcgis/lumina';
import type { TemplateResult } from 'lit';
import { html as ssrHtml } from '@lit-labs/ssr';
import type { LayoutBase } from '../types';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

/** @public */
export type SiteConfig = {
  /** @public */
  readonly title: string;
  /** @public */
  readonly description: string;
  /** @public */
  readonly keywords: string;
  /** @public */
  readonly author: string;
  /** @public */
  readonly baseUrl: string;
  /** @public */
  readonly themeColor: string;
  /** @public */
  readonly googleAnalyticsId?: string;
  /** @public */
  readonly twitter?: string;
};

/** @public */
export type RootLayoutMetadata = {
  /** @public */
  readonly title: string;
  /** @public */
  readonly description?: string;
  /** @public */
  readonly ogImage?: string;
  /** @public */
  readonly siteConfig: SiteConfig;
};

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

  //#endregion

  //#region Rendering

  override render(): TemplateResult {
    const { layoutData } = this;
    if (layoutData === undefined) {
      throw Error('layoutData is required for MpProjectLayout');
    }
    const { siteConfig } = layoutData;

    const fullTitle =
      layoutData.title === siteConfig.title
        ? siteConfig.title
        : `${layoutData.title} | ${siteConfig.title}`;
    const desc = layoutData.description ?? siteConfig.description;

    const head = ssrHtml`
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
  ${layoutData.ogImage !== undefined ? `<meta property="og:image" content="${siteConfig.baseUrl}${layoutData.ogImage}">` : ''}
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="${siteConfig.twitter}">
  <meta name="twitter:creator" content="${siteConfig.twitter}">
  <link rel="manifest" href="/manifest.webmanifest">
  <script async src="https://www.googletagmanager.com/gtag/js?id=${siteConfig.googleAnalyticsId}"></script>
  ${unsafeHTML(`<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${siteConfig.googleAnalyticsId}');
  </script>`)}
  `;

    return ssrHtml`<head>
        ${head}
      </head>
      <body>
        ${(<slot />)}
      </body>`;
  }

  //#endregion
}
