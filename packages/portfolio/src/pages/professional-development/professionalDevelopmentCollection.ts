import type {
  Collection,
  TypedLayoutMetadata,
} from '@maxpatiiuk/static-site-forge/types.js';
import type { PostPageMetadata } from '@maxpatiiuk/web-components/components/mp-post-layout';
import type { PageListPageMetadata } from '@maxpatiiuk/web-components/components/mp-page-list';
import { siteConfig } from '../../config.ts';

const base = {
  kind: 'professional-development',
  siteConfig,
} satisfies Partial<PostPageMetadata>;

const indexPage: PostPageMetadata & TypedLayoutMetadata<PageListPageMetadata> =
  {
    ...base,
    layout: async () =>
      await import('@maxpatiiuk/web-components/components/mp-page-list'),
    kind: 'index',
    title: 'Professional Development',
    pages: undefined!,
    children: false,
    prefix: 'professional-development',
  };

export const professionalDevelopmentCollection: Collection<PostPageMetadata> = {
  defaultLayout: async () =>
    await import('@maxpatiiuk/web-components/components/mp-post-layout'),
  pages: {
    index: indexPage,
    'google-io-2024': {
      ...base,
      title: 'Google I/O 2024 in-person attendee',
      description: 'Mountain View, CA',
      date: '2024-05-13',
      endDate: '2024-05-15',
    },
    'google-chrome-dev-summit-2020': {
      ...base,
      title: 'Google Chrome Dev Summit 2020',
      date: '2020-12-09',
    },
  },
};

(indexPage as { pages: (typeof indexPage)['pages'] }).pages =
  professionalDevelopmentCollection.pages;
