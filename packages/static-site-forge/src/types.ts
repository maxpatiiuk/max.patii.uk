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
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  readonly layout: () => Promise<any>;
};

/** @public */
export type Collection = Record<string, PageMetadata>;

/** @public */
export type ForgeConfig = {
  /** @public */
  readonly siteConfig: SiteConfig;
  /** @public */
  readonly collections: Record<string, Collection>;
};
