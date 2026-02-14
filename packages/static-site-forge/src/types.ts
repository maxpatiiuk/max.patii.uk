/** @public */
export type SiteConfig = {
  /** @public */
  readonly title: string;
  /** @public */
  readonly description: string;
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
export type PageFrontmatter = {
  /** @public */
  readonly title: string;
  /** @public */
  readonly description?: string;
  /** @public */
  readonly gitHub?: string;
  /** @public */
  readonly ogImage?: string;
  /** @public */
  readonly layout: string;
  /** @public */
  readonly slug: string;
};

/** @public */
export type PageData = {
  /** @public */
  readonly frontmatter: PageFrontmatter;
  /** @public */
  readonly content: string;
  /** @public */
  readonly rawMarkdown: string;
  /** @public */
  readonly sourcePath: string;
};

/** @public */
export type AdditionalPage = {
  /** @public */
  readonly path: string;
  /** @public */
  readonly html: string;
};

/** @public */
export type ForgeConfig = {
  /** @public */
  readonly contentDir: string;
  /** @public */
  readonly publicDir: string;
  /** @public */
  readonly outDir: string;
  /** @public */
  readonly siteConfig: SiteConfig;
  /**
   * @public
   * @param page - Page data.
   */
  readonly renderPage: (page: PageData) => string;
  /**
   * @public
   * @param pages - List of pages.
   */
  readonly renderIndex: (pages: readonly PageData[]) => string;
  /** @public */
  readonly render404: () => string;
  /** @public */
  readonly additionalPages?: readonly AdditionalPage[];
};
