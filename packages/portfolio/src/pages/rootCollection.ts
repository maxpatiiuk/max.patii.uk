import type {
  Collection,
  TypedLayoutMetadata,
} from '@maxpatiiuk/static-site-forge/types.js';
import { siteConfig } from '../config.ts';
import type { RootLayoutMetadata } from '@maxpatiiuk/web-components/components/mp-root-layout';
import { projectsCollection } from './projects/projectsCollection.ts';
import { articlesCollection } from './articles/articlesCollection.ts';
import type { HomePageMetadata } from '@maxpatiiuk/web-components/components/mp-home';
import { talksCollection } from './talks/talksCollection.ts';

const indexPage: TypedLayoutMetadata<HomePageMetadata> = {
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
    { label: 'readme', url: 'https://doc.patii.uk' },
    { label: 'cv', url: 'https://cv.patii.uk' },
  ],
  layout: async () =>
    await import('@maxpatiiuk/web-components/components/mp-home'),
  siteConfig,
  projects: projectsCollection.pages,
  articles: articlesCollection.pages,
  talks: talksCollection.pages,
  children: 'slot',
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const errorLayout = async () =>
  await import('@maxpatiiuk/web-components/components/mp-error-layout');

export const rootCollection: Collection<RootLayoutMetadata> = {
  defaultLayout: errorLayout,
  pages: {
    index: indexPage,
    '404': {
      title: '404: Not Found',
      layout: errorLayout,
      siteConfig,
    },
  },
};
