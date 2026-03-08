import type {
  Collection,
  TypedLayoutMetadata,
} from '@maxpatiiuk/static-site-forge/types.js';
import type { ProjectMetadata } from '@maxpatiiuk/web-components/components/mp-project-layout';
import { siteConfig } from '../../config.ts';
import type { ProjectsPageMetadata } from '@maxpatiiuk/web-components/components/mp-projects';

const indexPage: TypedLayoutMetadata<ProjectsPageMetadata> = {
  layout: async () =>
    await import('@maxpatiiuk/web-components/components/mp-projects'),
  siteConfig,
  title: 'Projects',
  projects: undefined!,
  hasMarkdownContent: false,
};
export const projectsCollection: Collection<ProjectMetadata> = {
  defaultLayout: async () =>
    await import('@maxpatiiuk/web-components/components/mp-project-layout'),
  pages: {
    index: indexPage,
    spacetime: {
      title: 'Spacetime',
      description: 'My Amazon Internship Project - real time dashboard',
      siteConfig,
      isFeatured: true,
    },
    alia: {
      title: 'Alia',
      description: 'x64, MIPS and LLVM compiler for my language',
      gitHub: 'https://github.com/maxpatiiuk/alia',
      siteConfig,
      isFeatured: true,
    },
    'calendar-plus': {
      title: 'Calendar Plus',
      description: 'Google Calendar extension for power users',
      gitHub: 'https://github.com/maxpatiiuk/calendar-plus',
      siteConfig,
      isFeatured: true,
    },
    'text-hoarder': {
      title: 'Text Hoarder',
      description: 'Chrome Extension: save articles & see reading stats',
      gitHub: 'https://github.com/maxpatiiuk/text-hoarder',
      siteConfig,
    },
    'query-builder': {
      title: 'Specify 7 Query Builder',
      description: 'Simple interface for building advanced queries',
      gitHub:
        'https://github.com/specify/specify7/tree/production/specifyweb/frontend/js_src',
      siteConfig,
    },
    'accessibility-refactor': {
      title: 'Specify 7 Accessibility Improvements',
      description:
        'WCAG 2.1 compliance, screen reader and keyboard navigation support',
      gitHub:
        'https://github.com/specify/specify7/tree/production/specifyweb/frontend/js_src',
      siteConfig,
    },
    'project-ephemeris': {
      title: 'Project Ephemeris',
      description: 'Full-fledged calendar application',
      gitHub: 'https://github.com/maxpatiiuk/project-ephemeris',
      siteConfig,
    },
    'specify7-test-panel': {
      title: 'Specify 7 Test Panel',
      description: 'Dashboard for orchestrating web-app deployments',
      gitHub: 'https://github.com/specify/specify7-test-panel',
      siteConfig,
    },
    workbench: {
      title: 'Specify 7 WorkBench',
      description:
        'Bulk data uploading system for collection management software',
      gitHub:
        'https://github.com/specify/specify7/tree/production/specifyweb/frontend/js_src',
      siteConfig,
    },
    weblate: {
      title: 'Specify 7 Continuous Localization',
      description: 'Two way integration with Weblate',
      gitHub:
        'https://github.com/specify/specify7/tree/production/specifyweb/frontend/js_src',
      siteConfig,
    },
    'small-retail-management': {
      title: 'Small Retail Management',
      description: 'Track retail revenue, expenses, and salaries',
      gitHub: 'https://github.com/maxpatiiuk/small-retail-management',
      siteConfig,
    },
    'tetris-react': {
      title: 'Tetris React',
      description: '(Mis)Using a mapping library to make a 3D game',
      gitHub: 'https://github.com/maxpatiiuk/tetris-react/',
      siteConfig,
    },
    'geo-io': {
      title: 'geo-io',
      description: 'Agar.io, but more mappy',
      gitHub: 'https://github.com/maxpatiiuk/geo-io/',
      siteConfig,
    },
    'interface-redesign': {
      title: 'Specify 7 UI&UX refactor',
      description:
        'Modern interface that feels intuitive and is a pleasure to use',
      gitHub:
        'https://github.com/specify/specify7/tree/production/specifyweb/frontend/js_src',
      siteConfig,
    },
    'goodreads-stats': {
      title: 'Goodreads Stats',
      description: 'Get insights into your reading habits',
      gitHub: 'https://github.com/maxpatiiuk/goodreads-stats',
      siteConfig,
    },
    lifemapper: {
      title: 'Species distribution projection map',
      description:
        'Interactive Leaflet map with multiple base layers and overlays',
      gitHub: 'https://github.com/specify/specify7',
      siteConfig,
    },
    'usage-stats': {
      title: 'Specify 7 Usage Stats visualizer',
      description: 'Internal usage stats explorer',
      gitHub: 'https://github.com/specify/sp7-stats',
      siteConfig,
    },
    'modernizing-usage-stats': {
      title: 'Specify 6 Usage Stats visualizer',
      description: 'Modernizing a legacy PHP codebase with no documentation',
      gitHub: 'https://github.com/specify/sp6-stats',
      siteConfig,
    },
    'socksy-linen': {
      title: 'Socksy Linen',
      description: 'A fashion store landing page',
      gitHub: 'https://github.com/maxpatiiuk/socksy.zzz.com.ua/',
      siteConfig,
    },
    'open-api': {
      title: 'OpenAPI-based automated tests',
      description:
        'Autogenerated tests of API services based on OpenAPI Schema',
      gitHub: 'https://github.com/specify/open_api_tools/',
      siteConfig,
    },
    pixelland: {
      title: 'Pixelland',
      description: 'A Canvas-based walking & building simulator',
      gitHub: 'https://github.com/maxpatiiuk/eecs-448-pixelland',
      siteConfig,
    },
    portfolio: {
      title: 'Portfolio',
      description: 'A minimalistic Next.js application',
      gitHub: 'https://github.com/maxpatiiuk/max.patii.uk/',
      siteConfig,
    },
    'tts-king': {
      title: 'TTS King',
      description:
        'Turn daily news digests into audio you can listen to wherever you are',
      gitHub: 'https://github.com/maxpatiiuk/TTS_King',
      siteConfig,
    },
    taxa: {
      title: 'Taxa Tree of Life Generator',
      description:
        'Convert Taxonomic Tree of Life from various authorities into a CSV file',
      gitHub: 'https://github.com/specify/taxa_tree/',
      siteConfig,
    },
    battleship: {
      title: 'Battleship',
      description: 'A modern spin on a classic game',
      gitHub: 'https://github.com/maxpatiiuk/eecs-448-battleship',
      siteConfig,
    },
  },
};

(indexPage as { projects: (typeof indexPage)['projects'] }).projects =
  projectsCollection.pages;
