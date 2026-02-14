import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import type { Collection } from '@maxpatiiuk/static-site-forge';

const dirname = join(fileURLToPath(import.meta.url), '..');

const loadContent = (path: string) => async (): Promise<string> =>
  await Promise.resolve(
    readFileSync(join(dirname, 'pages', path), 'utf-8').replace(
      /^---[\s\S]*?---/u,
      '',
    ),
  );

export const collections: readonly Collection[] = [
  {
    name: 'projects',
    items: [
      {
        metadata: {
          slug: 'spacetime',
          title: 'Spacetime',
          description: 'My Amazon Internship Project - real time dashboard',
        },
        content: loadContent('projects/spacetime.md'),
      },
      {
        metadata: {
          slug: 'alia',
          title: 'Alia',
          description: 'x64, MIPS and LLVM compiler for my language',
          gitHub: 'https://github.com/maxpatiiuk/alia',
        },
        content: loadContent('projects/alia.md'),
      },
      {
        metadata: {
          slug: 'calendar-plus',
          title: 'Calendar Plus',
          description: 'Google Calendar extension for power users',
          gitHub: 'https://github.com/maxpatiiuk/calendar-plus',
        },
        content: loadContent('projects/calendar-plus.md'),
      },
      {
        metadata: {
          slug: 'text-hoarder',
          title: 'Text Hoarder',
          description: 'Chrome Extension: save articles & see reading stats',
          gitHub: 'https://github.com/maxpatiiuk/text-hoarder',
        },
        content: loadContent('projects/text-hoarder.md'),
      },
      {
        metadata: {
          slug: 'query-builder',
          title: 'Specify 7 Query Builder',
          description: 'Simple interface for building advanced queries',
          gitHub:
            'https://github.com/specify/specify7/tree/production/specifyweb/frontend/js_src',
        },
        content: loadContent('projects/query-builder.md'),
      },
      {
        metadata: {
          slug: 'accessibility-refactor',
          title: 'Specify 7 Accessibility Improvements',
          description:
            'WCAG 2.1 compliance, screen reader and keyboard navigation support',
          gitHub:
            'https://github.com/specify/specify7/tree/production/specifyweb/frontend/js_src',
        },
        content: loadContent('projects/accessibility-refactor.md'),
      },
      {
        metadata: {
          slug: 'project-ephemeris',
          title: 'Project Ephemeris',
          description: 'Full-fledged calendar application',
          gitHub: 'https://github.com/maxpatiiuk/project-ephemeris',
        },
        content: loadContent('projects/project-ephemeris.md'),
      },
      {
        metadata: {
          slug: 'specify7-test-panel',
          title: 'Specify 7 Test Panel',
          description:
            'A dashboard for deploying Specify&nbsp;7 instances for QA purposes',
          gitHub: 'https://github.com/specify/specify7-test-panel',
        },
        content: loadContent('projects/specify7-test-panel.md'),
      },
      {
        metadata: {
          slug: 'workbench',
          title: 'Specify 7 WorkBench',
          description:
            'Bulk data uploading system for collection management software',
          gitHub:
            'https://github.com/specify/specify7/tree/production/specifyweb/frontend/js_src',
        },
        content: loadContent('projects/workbench.md'),
      },
      {
        metadata: {
          slug: 'weblate',
          title: 'Specify 7 Continuous Localization',
          description: 'Two way integration with Weblate',
          gitHub:
            'https://github.com/specify/specify7/tree/production/specifyweb/frontend/js_src',
        },
        content: loadContent('projects/weblate.md'),
      },
      {
        metadata: {
          slug: 'small-retail-management',
          title: 'Small Retail Management',
          description: 'Track retail revenue, expenses, and salaries',
          gitHub: 'https://github.com/maxpatiiuk/small-retail-management',
        },
        content: loadContent('projects/small-retail-management.md'),
      },
      {
        metadata: {
          slug: 'tetris-react',
          title: 'Tetris React',
          description: '(Mis)Using a mapping library to make a 3D game',
          gitHub: 'https://github.com/maxpatiiuk/tetris-react/',
        },
        content: loadContent('projects/tetris-react.md'),
      },
      {
        metadata: {
          slug: 'geo-io',
          title: 'geo-io',
          description: 'Agar.io, but more mappy',
          gitHub: 'https://github.com/maxpatiiuk/geo-io/',
        },
        content: loadContent('projects/geo-io.md'),
      },
      {
        metadata: {
          slug: 'interface-redesign',
          title: 'Specify 7 UI&UX refactor',
          description:
            'Modern interface that feels intuitive and is a pleasure to use',
          gitHub:
            'https://github.com/specify/specify7/tree/production/specifyweb/frontend/js_src',
        },
        content: loadContent('projects/interface-redesign.md'),
      },
      {
        metadata: {
          slug: 'goodreads-stats',
          title: 'Goodreads Stats',
          description: 'Get insights into your reading habits',
          gitHub: 'https://github.com/maxpatiiuk/goodreads-stats',
        },
        content: loadContent('projects/goodreads-stats.md'),
      },
      {
        metadata: {
          slug: 'lifemapper',
          title: 'Species distribution projection map',
          description:
            'Interactive Leaflet map with multiple base layers and overlays',
          gitHub: 'https://github.com/specify/specify7',
        },
        content: loadContent('projects/lifemapper.md'),
      },
      {
        metadata: {
          slug: 'usage-stats',
          title: 'Specify 7 Usage Stats visualizer',
          description: 'Internal usage stats explorer',
          gitHub: 'https://github.com/specify/sp7-stats',
        },
        content: loadContent('projects/usage-stats.md'),
      },
      {
        metadata: {
          slug: 'modernizing-usage-stats',
          title: 'Specify 6 Usage Stats visualizer',
          description:
            'Modernizing a legacy PHP codebase with no documentation',
          gitHub: 'https://github.com/specify/sp6-stats',
        },
        content: loadContent('projects/modernizing-usage-stats.md'),
      },
      {
        metadata: {
          slug: 'socksy-linen',
          title: 'Socksy Linen',
          description: 'A fashion store landing page',
          gitHub: 'https://github.com/maxpatiiuk/socksy.zzz.com.ua/',
        },
        content: loadContent('projects/socksy-linen.md'),
      },
      {
        metadata: {
          slug: 'open-api',
          title: 'OpenAPI-based automated tests',
          description:
            'Autogenerated tests of API services based on OpenAPI Schema',
          gitHub: 'https://github.com/specify/open_api_tools/',
        },
        content: loadContent('projects/open-api.md'),
      },
      {
        metadata: {
          slug: 'pixelland',
          title: 'Pixelland',
          description: 'A Canvas-based walking & building simulator',
          gitHub: 'https://github.com/maxpatiiuk/eecs-448-pixelland',
        },
        content: loadContent('projects/pixelland.md'),
      },
      {
        metadata: {
          slug: 'portfolio',
          title: 'Portfolio',
          description: 'A minimalistic Next.js application',
          gitHub: 'https://github.com/maxpatiiuk/max.patii.uk/',
        },
        content: loadContent('projects/portfolio.md'),
      },
      {
        metadata: {
          slug: 'tts-king',
          title: 'TTS King',
          description: '',
          gitHub: 'https://github.com/maxpatiiuk/TTS_King',
        },
        content: loadContent('projects/tts-king.md'),
      },
      {
        metadata: {
          slug: 'taxa',
          title: 'Taxa Tree of Life Generator',
          description: '',
          gitHub: 'https://github.com/specify/taxa_tree/',
        },
        content: loadContent('projects/taxa.md'),
      },
      {
        metadata: {
          slug: 'battleship',
          title: 'Battleship',
          description: 'A modern spin on a classic game',
          gitHub: 'https://github.com/maxpatiiuk/eecs-448-battleship',
        },
        content: loadContent('projects/battleship.md'),
      },
    ],
  },
];
