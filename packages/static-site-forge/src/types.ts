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
export type PageMetadata = {
  /** @public */
  readonly title: string;
  /** @public */
  readonly description?: string;
  /** @public */
  readonly gitHub?: string;
  /** @public */
  readonly ogImage?: string;
  /** @public */
  readonly layout?: string;
};

/** @public */
export type PageData = {
  readonly slug: string;
  /** @public */
  readonly metadata: PageMetadata;
  /** @public */
  readonly content: string;
};

/** @public */
export type Collection = Record<string, PageMetadata>;

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
  readonly siteConfig: SiteConfig;
  /** @public */
  readonly collections: Record<string, Collection>;
  /**
   * @public
   * @param page - Page data.
   */
  readonly renderPage: (page: PageData) => string;
  /**
   * @public
   */
  readonly renderIndex: () => string;
  /** @public */
  readonly render404: () => string;
  /** @public */
  readonly additionalPages?: readonly AdditionalPage[];
};
