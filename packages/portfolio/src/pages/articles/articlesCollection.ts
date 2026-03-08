import type {
  Collection,
  TypedLayoutMetadata,
} from '@maxpatiiuk/static-site-forge/types.js';
import type { PostPageMetadata } from '@maxpatiiuk/web-components/components/mp-post-layout';
import { siteConfig } from '../../config.ts';
import type { ArticlesPageMetadata } from '@maxpatiiuk/web-components/components/mp-articles';

const articleBase = {
  kind: 'article',
  siteConfig,
} satisfies Partial<PostPageMetadata>;

const indexPage: PostPageMetadata & TypedLayoutMetadata<ArticlesPageMetadata> =
  {
    layout: async () =>
      await import('@maxpatiiuk/web-components/components/mp-articles'),
    siteConfig,
    kind: 'index',
    title: 'Articles',
    articles: undefined!,
    hasMarkdownContent: false,
  };

export const articlesCollection: Collection<PostPageMetadata> = {
  defaultLayout: async () =>
    await import('@maxpatiiuk/web-components/components/mp-post-layout'),
  pages: {
    index: indexPage,
    'ai-code-2026': {
      ...articleBase,
      title: 'AI-generated code lacks common sense',
      isFeatured: true,
      date: '2026-01-25',
    },
  },
};

(indexPage as { articles: (typeof indexPage)['articles'] }).articles =
  articlesCollection.pages;
