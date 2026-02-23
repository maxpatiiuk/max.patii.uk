import type {
  Collection,
  GetLayout,
} from '@maxpatiiuk/static-site-forge/types.js';
import { rootCollection } from './pages/rootCollection.ts';
import { projectsCollection } from './pages/projects/projectsCollection.ts';
import type { RootLayoutMetadata } from '@maxpatiiuk/web-components/components/mp-root-layout';

export const collections: Record<string, Collection> = {
  '': rootCollection,
  projects: projectsCollection,
};

export const rootLayout: GetLayout<RootLayoutMetadata> = async () =>
  await import('@maxpatiiuk/web-components/components/mp-root-layout');
