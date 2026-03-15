import type { CollectionsContent } from '@maxpatiiuk/static-site-forge/types.js';
import { rootCollection } from './pages/rootCollection.ts';
import { projectsCollection } from './pages/projects/projectsCollection.ts';
import { articlesCollection } from './pages/articles/articlesCollection.ts';
import { talksCollection } from './pages/talks/talksCollection.ts';

export const content: CollectionsContent = {
  collections: {
    '': rootCollection,
    projects: projectsCollection,
    articles: articlesCollection,
    talks: talksCollection,
  },
  rootLayout: async () =>
    await import('@maxpatiiuk/web-components/components/mp-root-layout'),
  defaultOgImage: '/icon3.png',
  defaultOgImageAlt: 'Max Patiiuk',
};
