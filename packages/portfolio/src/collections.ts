import type {
  Collection,
  GetLayout,
} from '@maxpatiiuk/static-site-forge/types.js';
import { rootCollection } from './pages/rootCollection.ts';
import { projectsCollection } from './pages/projects/projectsCollection.ts';
import { articlesCollection } from './pages/articles/articlesCollection.ts';
import type { RootLayoutMetadata } from '@maxpatiiuk/web-components/components/mp-root-layout';
import { talksCollection } from './pages/talks/talksCollection.ts';

export const collections: Record<string, Collection> = {
  '': rootCollection,
  projects: projectsCollection,
  articles: articlesCollection,
  talks: talksCollection,
};

export const rootLayout: GetLayout<RootLayoutMetadata> = async () =>
  await import('@maxpatiiuk/web-components/components/mp-root-layout');
