export type SiteConfig = {
  readonly title: string;
  readonly description: string;
  readonly baseUrl: string;
  readonly themeColor: string;
  readonly googleAnalyticsId?: string;
  readonly twitter?: string;
};

export type PageFrontmatter = {
  readonly title: string;
  readonly description?: string;
  readonly gitHub?: string;
  readonly ogImage?: string;
  readonly layout: string;
  readonly slug: string;
};

export type PageData = {
  readonly frontmatter: PageFrontmatter;
  readonly content: string;
  readonly rawMarkdown: string;
  readonly sourcePath: string;
};

export type ForgeConfig = {
  readonly contentDir: string;
  readonly publicDir: string;
  readonly outDir: string;
  readonly siteConfig: SiteConfig;
  readonly renderPage: (page: PageData) => string;
  readonly renderIndex: (pages: readonly PageData[]) => string;
  readonly render404: () => string;
  readonly additionalPages?: readonly {
    readonly path: string;
    readonly html: string;
  }[];
};
