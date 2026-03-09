/** @public */
export interface BasePageMetadata {
  /** @public */
  readonly title: string;
  /** @public */
  readonly description?: string;
  /**
   * Will be set based on first image if not provided.
   *
   * @public
   */
  ogImage?: string;
  /**
   * Will be set based on first image alt text if not provided.
   * Only set alt for non-decorative images.
   *
   * @public
   */
  ogImageAlt?: string;
  /** @public */
  readonly layout?: GetLayout<BasePageMetadata> | false;
  /** @public */
  readonly hasMarkdownContent?: false;
  /** @public */
  readonly externalUrl?: string;
}

/** @public */
export type TypedLayoutMetadata<T extends BasePageMetadata> = BasePageMetadata &
  T & {
    /** @public */
    readonly layout: GetLayout<T>;
  };

/** @public */
export interface Collection<T extends BasePageMetadata = BasePageMetadata> {
  /** @public */
  defaultLayout: GetLayout<T>;
  /** @public */
  pages: Record<string, BasePageMetadata & T>;
}

/** @public */
export type GetLayout<T extends BasePageMetadata> = () => Promise<
  LayoutModule<T>
>;

/** @public */
type LayoutModule<T extends BasePageMetadata> = Record<
  `Mp${string}`,
  { prototype: { layoutData?: T } }
>;

/** @public */
export interface ForgeConfig {
  /**
   * @public
   * @param tagName
   */
  readonly getWebComponentImportPath: (tagName: string) => string;
  /**
   * By default, all external imports in the SSR bundle are externalized. This
   * improves efficiency. If some dependency is not directly runnable in Node.js
   * and must go through Vite's processing, add it to this list.
   *
   * @public
   */
  readonly ssrBundleIn?: RegExp[];
}

export interface ResolvedPage {
  collectionName: string;
  slug: string;
  metadata: BasePageMetadata;
  collection: Collection;
}
