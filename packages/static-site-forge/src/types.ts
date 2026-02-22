/** @public */
export type BasePageMetadata = {
  /** @public */
  readonly title: string;
  /** @public */
  readonly description?: string;
  /** @public */
  readonly ogImage?: string;
  /** @public */
  readonly layout?: GetLayout<BasePageMetadata>;
};

/** @public */
export type TypedLayoutMetadata<T extends BasePageMetadata> = T & {
  /** @public */
  readonly layout: GetLayout<T>;
};

/** @public */
export type Collection<T extends BasePageMetadata = BasePageMetadata> = {
  /** @public */
  defaultLayout: GetLayout<T>;
  /** @public */
  pages: Record<string, T>;
};

/** @public */
type GetLayout<T extends BasePageMetadata> = () => Promise<LayoutModule<T>>;

/** @public */
type LayoutModule<T extends BasePageMetadata> = Record<
  `Mp${string}`,
  { prototype: { layoutData?: T } }
>;

/** @public */
export type ForgeConfig = {
  /**
   * @public
   * @param tagName
   */
  readonly getWebComponentImportPath: (tagName: string) => string;
};
