import type { Collection } from '@maxpatiiuk/static-site-forge/types.js';
import { rootCollection } from './pages/rootCollection.ts';
import { projectsCollection } from './pages/projects/projectsCollection.ts';

export const collections: Record<string, Collection> = {
  '': rootCollection,
  projects: projectsCollection,
};
