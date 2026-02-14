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
  /** @public */
  readonly slug: string;
};

/** @public */
export type PageData = {
  /** @public */
  readonly metadata: PageMetadata;
  /** @public */
  readonly content: string;
  /** @public */
  readonly sourcePath?: string;
};

/** @public */
export type CollectionItem = {
  /** @public */
  readonly metadata: PageMetadata;
  /**
   * @public
   * @returns The markdown content.
   */
  readonly content: () => Promise<string>;
};

/** @public */
export type Collection = {
  /** @public */
  readonly name: string;
  /** @public */
  readonly items: readonly CollectionItem[];
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
  readonly siteConfig: SiteConfig;
  /** @public */
  readonly collections: readonly Collection[];
  /**
   * @public
   * @param page - Page data.
   */
  readonly renderPage: (page: PageData) => string;
  /**
   * @public
   * @param collections - List of collections.
   */
  readonly renderIndex: (collections: readonly Collection[]) => string;
  /** @public */
  readonly render404: () => string;
  /** @public */
  readonly additionalPages?: readonly AdditionalPage[];
};
