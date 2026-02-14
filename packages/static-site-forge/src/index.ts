/** @public */
export { useStaticSiteForge } from './plugin.js';
/** @public */
export { markdownToHtml } from './markdown/scanner.js';
/** @public */
export { generateSite } from './pages/generator.js';
/** @public */
export type {
  SiteConfig,
  PageMetadata,
  PageData,
  ForgeConfig,
  Collection,
  CollectionItem,
  AdditionalPage,
} from './types.js';
