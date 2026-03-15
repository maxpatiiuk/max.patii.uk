import type {
  Collection,
  TypedLayoutMetadata,
} from '@maxpatiiuk/static-site-forge/types.js';
import type { PostPageMetadata } from '@maxpatiiuk/web-components/components/mp-post-layout';
import { siteConfig } from '../../config.ts';
import type { PageListPageMetadata } from '@maxpatiiuk/web-components/components/mp-page-list';

const base = {
  kind: 'article',
  siteConfig,
  seriesSource: { collectionName: 'articles', pages: {} },
} satisfies Partial<PostPageMetadata>;

const indexPage: PostPageMetadata & TypedLayoutMetadata<PageListPageMetadata> =
  {
    ...base,
    layout: async () =>
      await import('@maxpatiiuk/web-components/components/mp-page-list'),
    siteConfig,
    kind: 'index',
    title: 'Articles',
    pages: undefined!,
    hasMarkdownContent: false,
    prefix: 'articles',
  };

// TODO: a cli to convert .md to dev.to-compatible md - and eventually
// auto-post and auto-update on dev.to. see also
// https://github.com/sinedied/publish-devto/blob/main/index.js
export const articlesCollection: Collection<PostPageMetadata> = {
  defaultLayout: async () =>
    await import('@maxpatiiuk/web-components/components/mp-post-layout'),
  pages: {
    index: indexPage,
    'ai-code-2026': {
      ...base,
      title: 'AI-generated code lacks common sense',
      isFeatured: true,
      date: '2026-01-25',
      devToLink:
        'https://dev.to/maxpatiiuk/ai-generated-code-lacks-common-sense-29bo',
    },
    'self-reflection': {
      ...base,
      title:
        'How I Use Self-Reflection to Stay on Track Daily, Weekly, Monthly, and Yearly',
      date: '2025-12-15',
      devToLink:
        'https://dev.to/maxpatiiuk/how-i-use-self-reflection-to-stay-on-track-daily-weekly-monthly-and-yearly-1n1f',
      seriesName: 'The Workaholic Chronicles',
    },
    'hyper-scheduling': {
      ...base,
      title:
        'How I Tracked Every Hour of My Life for 4 Years - and What You Can Learn From It',
      isFeatured: true,
      date: '2025-07-30',
      devToLink:
        'https://dev.to/maxpatiiuk/how-i-tracked-every-hour-of-my-life-for-4-years-and-what-you-can-learn-from-it-4pic',
      seriesName: 'The Workaholic Chronicles',
    },
    'outdated-security-advice': {
      ...base,
      title: 'A lot of mobile IT security advice is a decade out of date',
      date: '2025-05-24',
      devToLink:
        'https://dev.to/maxpatiiuk/most-personal-it-security-advice-is-a-decade-out-of-date-2oo',
    },
    'my-journey-with-rsi': {
      ...base,
      title: 'My Journey with RSI',
      date: '2025-05-18',
      devToLink: 'https://dev.to/maxpatiiuk/my-journey-with-rsi-4f9m',
      seriesName: 'My Journey with RSI',
    },
    '7-less-common-computer-input-devices': {
      ...base,
      title: '7 less common computer input devices',
      isFeatured: true,
      date: '2025-04-27',
      seriesName: 'My Journey with RSI',
      devToLink:
        'https://dev.to/maxpatiiuk/7-less-common-computer-input-devices-1bel',
    },
    'optimistic-determinism': {
      ...base,
      title: 'Optimistic Determinism and Existentialism',
      date: '2023-09-03',
      devToLink:
        'https://dev.to/maxpatiiuk/optimistic-determinism-and-existentialism-5f2a',
    },
    'proton-unlimited': {
      ...base,
      title: 'Proton Unlimited: A comprehensive review',
      isFeatured: true,
      date: '2023-08-22',
      devToLink:
        'https://dev.to/maxpatiiuk/proton-unlimited-a-comprehensive-review-372a',
    },
    'amazon-internship-reflection': {
      ...base,
      title: 'Reflection on the Amazon Internship',
      date: '2023-07-18',
      devToLink:
        'https://dev.to/maxpatiiuk/reflection-on-the-amazon-internship-14k9',
      seriesName: 'Amazon Internship',
    },
    'amazon-internship-lessons-learned': {
      ...base,
      title: '50 Lessons learned from an Amazon Internship',
      date: '2023-07-18',
      devToLink:
        'https://dev.to/maxpatiiuk/lessons-learned-from-an-amazon-internship-5e5b',
      seriesName: 'Amazon Internship',
    },
    'vue-js-issues': {
      ...base,
      title: '6 big issues with Vue.js',
      date: '2023-07-17',
      devToLink: 'https://dev.to/maxpatiiuk/6-big-issues-with-vuejs-3he5',
    },
    'github-copilot-issues-2023': {
      ...base,
      title: 'Shortcomings of GitHub Copilot',
      date: '2023-07-17',
      devToLink: 'https://dev.to/maxpatiiuk/shortcomings-of-github-copilot-1ge',
    },
  },
};

(indexPage as { pages: (typeof indexPage)['pages'] }).pages =
  articlesCollection.pages;
base.seriesSource.pages = articlesCollection.pages;
