import type {
  Collection,
  TypedLayoutMetadata,
} from '@maxpatiiuk/static-site-forge/types.js';
import type { PostPageMetadata } from '@maxpatiiuk/web-components/components/mp-post-layout';
import { siteConfig } from '../../config.ts';
import type { PageListPageMetadata } from '@maxpatiiuk/web-components/components/mp-page-list';

const base = {
  kind: 'project',
  siteConfig,
} satisfies Partial<PostPageMetadata>;

const indexPage: PostPageMetadata & TypedLayoutMetadata<PageListPageMetadata> =
  {
    layout: async () =>
      await import('@maxpatiiuk/web-components/components/mp-page-list'),
    siteConfig,
    kind: 'index',
    title: 'Projects',
    pages: undefined!,
    hasMarkdownContent: false,
    prefix: 'projects',
  };

export const projectsCollection: Collection<PostPageMetadata> = {
  defaultLayout: async () =>
    await import('@maxpatiiuk/web-components/components/mp-post-layout'),
  pages: {
    index: indexPage,
    'portfolio-2026': {
      ...base,
      title: 'Portfolio',
      description: 'Elegant and performant static site',
      gitHub: 'https://github.com/maxpatiiuk/max.patii.uk/',
      date: '2026',
      isFeatured: true,
    },
    spacetime: {
      ...base,
      title: 'Spacetime',
      description: 'My Amazon Internship Project - real time dashboard',
      date: '2022',
      isFeatured: true,
    },
    alia: {
      ...base,
      title: 'Alia',
      description: 'x64, MIPS and LLVM compiler for my language',
      gitHub: 'https://github.com/maxpatiiuk/alia',
      date: '2022',
      isFeatured: true,
    },
    'calendar-plus': {
      ...base,
      title: 'Calendar Plus',
      description: 'Google Calendar extension for power users',
      gitHub: 'https://github.com/maxpatiiuk/calendar-plus',
      date: '2023',
      isFeatured: true,
    },
    'text-hoarder': {
      ...base,
      title: 'Text Hoarder',
      description: 'Chrome Extension: save articles & see reading stats',
      gitHub: 'https://github.com/maxpatiiuk/text-hoarder',
      date: '2024',
    },
    'query-builder': {
      ...base,
      title: 'Specify 7 Query Builder',
      description: 'Simple interface for building advanced queries',
      gitHub:
        'https://github.com/specify/specify7/tree/production/specifyweb/frontend/js_src',
      date: '2022',
    },
    'project-ephemeris': {
      ...base,
      title: 'Project Ephemeris',
      description: 'Full-fledged calendar application',
      gitHub: 'https://github.com/maxpatiiuk/project-ephemeris',
      date: '2022',
    },
    'accessibility-refactor': {
      ...base,
      title: 'Specify 7 Accessibility Improvements',
      description:
        'WCAG 2.1 compliance, screen reader and keyboard navigation support',
      gitHub:
        'https://github.com/specify/specify7/tree/production/specifyweb/frontend/js_src',
      date: '2022',
    },
    'specify7-test-panel': {
      ...base,
      title: 'Specify 7 Test Panel',
      description: 'Dashboard for orchestrating web-app deployments',
      gitHub: 'https://github.com/specify/specify7-test-panel',
      date: '2021',
    },
    workbench: {
      ...base,
      title: 'Specify 7 WorkBench',
      description:
        'Bulk data uploading system for collection management software',
      gitHub:
        'https://github.com/specify/specify7/tree/production/specifyweb/frontend/js_src',
      date: '2021',
    },
    weblate: {
      ...base,
      title: 'Specify 7 Continuous Localization',
      description: 'Two way integration with Weblate',
      date: '2022',
      gitHub:
        'https://github.com/specify/specify7/tree/production/specifyweb/frontend/js_src',
    },
    'small-retail-management': {
      ...base,
      title: 'Small Retail Management',
      description: 'Track retail revenue, expenses, and salaries',
      gitHub: 'https://github.com/maxpatiiuk/small-retail-management',
      date: '2023',
    },
    'tetris-react': {
      ...base,
      title: 'Tetris React',
      description: '(Mis)Using a mapping library to make a 3D game',
      gitHub: 'https://github.com/maxpatiiuk/tetris-react/',
      date: '2024',
    },
    'geo-io': {
      ...base,
      title: 'geo-io',
      description: 'Agar.io, but more mappy',
      gitHub: 'https://github.com/maxpatiiuk/geo-io/',
      date: '2025',
    },
    'interface-redesign': {
      ...base,
      title: 'Specify 7 UI&UX refactor',
      description:
        'Modern interface that feels intuitive and is a pleasure to use',
      gitHub:
        'https://github.com/specify/specify7/tree/production/specifyweb/frontend/js_src',
      date: '2022',
    },
    'goodreads-stats': {
      ...base,
      title: 'Goodreads Stats',
      description: 'Get insights into your reading habits',
      gitHub: 'https://github.com/maxpatiiuk/goodreads-stats',
      date: '2023',
    },
    lifemapper: {
      ...base,
      title: 'Species distribution projection map',
      description:
        'Interactive Leaflet map with multiple base layers and overlays',
      gitHub: 'https://github.com/specify/specify7',
      date: '2021',
    },
    'usage-stats': {
      ...base,
      title: 'Specify 7 Usage Stats visualizer',
      description: 'Internal usage stats explorer',
      gitHub: 'https://github.com/specify/sp7-stats',
      date: '2020',
    },
    'modernizing-usage-stats': {
      ...base,
      title: 'Specify 6 Usage Stats visualizer',
      description: 'Modernizing a legacy PHP codebase with no documentation',
      gitHub: 'https://github.com/specify/sp6-stats',
      date: '2019',
    },
    'socksy-linen': {
      ...base,
      title: 'Socksy Linen',
      description: 'A fashion store landing page',
      gitHub: 'https://github.com/maxpatiiuk/socksy.zzz.com.ua/',
      date: '2019',
    },
    'open-api': {
      ...base,
      title: 'OpenAPI-based automated tests',
      description:
        'Autogenerated tests of API services based on OpenAPI Schema',
      gitHub: 'https://github.com/specify/open_api_tools/',
      date: '2021',
    },
    pixelland: {
      ...base,
      title: 'Pixelland',
      description: 'A Canvas-based walking & building simulator',
      gitHub: 'https://github.com/maxpatiiuk/eecs-448-pixelland',
      date: '2023',
    },
    portfolio: {
      ...base,
      title: 'Portfolio (2021)',
      description: 'A minimalistic Next.js application',
      gitHub:
        'https://github.com/maxpatiiuk/max.patii.uk/tree/max/next-js-checkpoint/',
      date: '2021',
    },
    'tts-king': {
      ...base,
      title: 'TTS King',
      description:
        'Turn daily news digests into audio you can listen to on the go',
      gitHub: 'https://github.com/maxpatiiuk/TTS_King',
      date: '2021',
    },
    taxa: {
      ...base,
      title: 'Taxa Tree of Life Generator',
      description: 'Export a Taxonomic Tree of Life from authoritative sources',
      gitHub: 'https://github.com/specify/taxa_tree/',
      date: '2020',
    },
    battleship: {
      ...base,
      title: 'Battleship',
      description: 'A modern spin on a classic game',
      gitHub: 'https://github.com/maxpatiiuk/eecs-448-battleship',
      date: '2021',
    },
  },
};

(indexPage as { pages: (typeof indexPage)['pages'] }).pages =
  projectsCollection.pages;
