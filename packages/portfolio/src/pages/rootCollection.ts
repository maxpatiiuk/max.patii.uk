import type {
  BasePageMetadata,
  Collection,
  LayoutModule,
  TypedLayoutMetadata,
} from '@maxpatiiuk/static-site-forge/types.js';
import type { HomeLayoutMetadata } from '@maxpatiiuk/web-components/components/mp-home-layout';
import { siteConfig } from '../config';

const indexPage: TypedLayoutMetadata<HomeLayoutMetadata> = {
  title: 'Max Patiiuk',
  description: 'Senior SDE at Esri',
  authorTitle: 'Senior SDE at Esri',
  links: [
    { label: 'max@patii.uk', url: 'mailto:max@patii.uk' },
    { label: 'linkedin', url: 'https://linkedin.patii.uk' },
    { label: 'github', url: 'https://github.patii.uk' },
    { label: 'twitter', url: 'https://twitter.patii.uk' },
    { label: 'instagram', url: 'https://instagram.patii.uk' },
    { label: 'youtube', url: 'https://youtube.com/@maxpatiiuk' },
    { label: 'books', url: 'https://books.patii.uk' },
    { label: 'blog', url: 'https://blog.patii.uk' },
    { label: 'about', url: 'https://doc.patii.uk' },
    { label: 'cv', url: 'https://cv.patii.uk' },
  ],
  layout: async () =>
    await import('@maxpatiiuk/web-components/components/mp-home-layout'),
  siteConfig,
};

const errorLayout = async (): Promise<LayoutModule<BasePageMetadata>> =>
  await import('@maxpatiiuk/web-components/components/mp-error-layout');

export const rootCollection: Collection = {
  defaultLayout: errorLayout,
  pages: {
    index: indexPage,
    '404': {
      title: '404: Not Found',
      layout: errorLayout,
    },
  },
};
