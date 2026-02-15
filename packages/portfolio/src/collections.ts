import type { TemplateResult } from 'lit';
import type { PageMetadata } from '@maxpatiiuk/static-site-forge';

/* eslint-disable @typescript-eslint/no-explicit-any */
const projectLayout = async (): Promise<{ renderLayout: any }> =>
  await import('./layouts/project.js');
const homeLayout = async (): Promise<{ renderLayout: any }> =>
  await import('./layouts/home.js');
const errorLayout = async (): Promise<{ renderLayout: any }> =>
  await import('./layouts/error.js');
/* eslint-enable @typescript-eslint/no-explicit-any */

export const collections: Record<string, Record<string, PageMetadata>> = {
  pages: {
    index: {
      title: 'Max Patiiuk',
      description: 'Senior SDE at Esri',
      layout: homeLayout,
    },
    '404': {
      title: '404: Not Found',
      layout: errorLayout,
    },
  },
  projects: {
    spacetime: {
      title: 'Spacetime',
      description: 'My Amazon Internship Project - real time dashboard',
      layout: projectLayout,
    },
    alia: {
      title: 'Alia',
      description: 'x64, MIPS and LLVM compiler for my language',
      gitHub: 'https://github.com/maxpatiiuk/alia',
      layout: projectLayout,
    },
    'calendar-plus': {
      title: 'Calendar Plus',
      description: 'Google Calendar extension for power users',
      gitHub: 'https://github.com/maxpatiiuk/calendar-plus',
      layout: projectLayout,
    },
    'text-hoarder': {
      title: 'Text Hoarder',
      description: 'Chrome Extension: save articles & see reading stats',
      gitHub: 'https://github.com/maxpatiiuk/text-hoarder',
      layout: projectLayout,
    },
    'query-builder': {
      title: 'Specify 7 Query Builder',
      description: 'Simple interface for building advanced queries',
      gitHub:
        'https://github.com/specify/specify7/tree/production/specifyweb/frontend/js_src',
      layout: projectLayout,
    },
    'accessibility-refactor': {
      title: 'Specify 7 Accessibility Improvements',
      description:
        'WCAG 2.1 compliance, screen reader and keyboard navigation support',
      gitHub:
        'https://github.com/specify/specify7/tree/production/specifyweb/frontend/js_src',
      layout: projectLayout,
    },
    'project-ephemeris': {
      title: 'Project Ephemeris',
      description: 'Full-fledged calendar application',
      gitHub: 'https://github.com/maxpatiiuk/project-ephemeris',
      layout: projectLayout,
    },
    'specify7-test-panel': {
      title: 'Specify 7 Test Panel',
      description:
        'A dashboard for deploying Specify&nbsp;7 instances for QA purposes',
      gitHub: 'https://github.com/specify/specify7-test-panel',
      layout: projectLayout,
    },
    workbench: {
      title: 'Specify 7 WorkBench',
      description:
        'Bulk data uploading system for collection management software',
      gitHub:
        'https://github.com/specify/specify7/tree/production/specifyweb/frontend/js_src',
      layout: projectLayout,
    },
    weblate: {
      title: 'Specify 7 Continuous Localization',
      description: 'Two way integration with Weblate',
      gitHub:
        'https://github.com/specify/specify7/tree/production/specifyweb/frontend/js_src',
      layout: projectLayout,
    },
    'small-retail-management': {
      title: 'Small Retail Management',
      description: 'Track retail revenue, expenses, and salaries',
      gitHub: 'https://github.com/maxpatiiuk/small-retail-management',
      layout: projectLayout,
    },
    'tetris-react': {
      title: 'Tetris React',
      description: '(Mis)Using a mapping library to make a 3D game',
      gitHub: 'https://github.com/maxpatiiuk/tetris-react/',
      layout: projectLayout,
    },
    'geo-io': {
      title: 'geo-io',
      description: 'Agar.io, but more mappy',
      gitHub: 'https://github.com/maxpatiiuk/geo-io/',
      layout: projectLayout,
    },
    'interface-redesign': {
      title: 'Specify 7 UI&UX refactor',
      description:
        'Modern interface that feels intuitive and is a pleasure to use',
      gitHub:
        'https://github.com/specify/specify7/tree/production/specifyweb/frontend/js_src',
      layout: projectLayout,
    },
    'goodreads-stats': {
      title: 'Goodreads Stats',
      description: 'Get insights into your reading habits',
      gitHub: 'https://github.com/maxpatiiuk/goodreads-stats',
      layout: projectLayout,
    },
    lifemapper: {
      title: 'Species distribution projection map',
      description:
        'Interactive Leaflet map with multiple base layers and overlays',
      gitHub: 'https://github.com/specify/specify7',
      layout: projectLayout,
    },
    'usage-stats': {
      title: 'Specify 7 Usage Stats visualizer',
      description: 'Internal usage stats explorer',
      gitHub: 'https://github.com/specify/sp7-stats',
      layout: projectLayout,
    },
    'modernizing-usage-stats': {
      title: 'Specify 6 Usage Stats visualizer',
      description: 'Modernizing a legacy PHP codebase with no documentation',
      gitHub: 'https://github.com/specify/sp6-stats',
      layout: projectLayout,
    },
    'socksy-linen': {
      title: 'Socksy Linen',
      description: 'A fashion store landing page',
      gitHub: 'https://github.com/maxpatiiuk/socksy.zzz.com.ua/',
      layout: projectLayout,
    },
    'open-api': {
      title: 'OpenAPI-based automated tests',
      description:
        'Autogenerated tests of API services based on OpenAPI Schema',
      gitHub: 'https://github.com/specify/open_api_tools/',
      layout: projectLayout,
    },
    pixelland: {
      title: 'Pixelland',
      description: 'A Canvas-based walking & building simulator',
      gitHub: 'https://github.com/maxpatiiuk/eecs-448-pixelland',
      layout: projectLayout,
    },
    portfolio: {
      title: 'Portfolio',
      description: 'A minimalistic Next.js application',
      gitHub: 'https://github.com/maxpatiiuk/max.patii.uk/',
      layout: projectLayout,
    },
    'tts-king': {
      title: 'TTS King',
      description: '',
      gitHub: 'https://github.com/maxpatiiuk/TTS_King',
      layout: projectLayout,
    },
    taxa: {
      title: 'Taxa Tree of Life Generator',
      description: '',
      gitHub: 'https://github.com/specify/taxa_tree/',
      layout: projectLayout,
    },
    battleship: {
      title: 'Battleship',
      description: 'A modern spin on a classic game',
      gitHub: 'https://github.com/maxpatiiuk/eecs-448-battleship',
      layout: projectLayout,
    },
  },
};
