import type { Collection } from '@maxpatiiuk/static-site-forge/types';
import { rootCollection } from './pages/rootCollection';
import { projectsCollection } from './pages/projects/projectsCollection';

export const collections: Record<string, Collection> = {
  root: rootCollection,
  projects: projectsCollection,
};
