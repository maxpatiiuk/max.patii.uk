import type {
  Collection,
  TypedLayoutMetadata,
} from '@maxpatiiuk/static-site-forge/types.js';
import type { PostPageMetadata } from '@maxpatiiuk/web-components/components/mp-post-layout';
import { siteConfig } from '../../config.ts';
import type { PageListPageMetadata } from '@maxpatiiuk/web-components/components/mp-page-list';

const base = {
  kind: 'talk',
  siteConfig,
} satisfies Partial<PostPageMetadata>;

const indexPage: PostPageMetadata & TypedLayoutMetadata<PageListPageMetadata> =
  {
    ...base,
    layout: async () =>
      await import('@maxpatiiuk/web-components/components/mp-page-list'),
    siteConfig,
    kind: 'index',
    title: 'Talks',
    pages: undefined!,
    children: false,
    prefix: 'talks',
  };

export const talksCollection: Collection<PostPageMetadata> = {
  defaultLayout: async () =>
    await import('@maxpatiiuk/web-components/components/mp-post-layout'),
  pages: {
    index: indexPage,
    '2026-dev-summit-a-look-under-the-hood': {
      ...base,
      title: 'ArcGIS Maps SDK for JavaScript: A Look Under the Hood',
      date: '2026-03-11',
      description: 'Esri Dev & Tech Summit',
      externalUrl:
        'https://github.com/maxpatiiuk/esri-dev-summit-presentations/tree/main/2026/a-look-under-the-hood#readme',
      isFeatured: true,
    },
    '2026-dev-summit-using-components-2': {
      ...base,
      title:
        'ArcGIS Maps SDK for JavaScript: App Development with Components, Part 2: Using Frameworks',
      date: '2026-03-11',
      description: 'Esri Dev & Tech Summit',
      externalUrl:
        'https://github.com/maxpatiiuk/esri-dev-summit-presentations/tree/main/2026/using-components-2#readme',
      isFeatured: true,
    },
    '2026-dev-summit-build-tooling': {
      ...base,
      title:
        'ArcGIS Maps SDK for JavaScript: Using Vite for Building Fast, Dynamic Web Apps',
      date: '2026-03-12',
      description: 'Esri Dev & Tech Summit',
      externalUrl:
        'https://github.com/maxpatiiuk/esri-dev-summit-presentations/tree/main/2026/build-tooling#readme',
      isFeatured: true,
    },
    '2025-dev-summit-using-components-2': {
      ...base,
      title:
        'ArcGIS Maps SDK for JavaScript: App Development with Components part 2: Using Frameworks',
      date: '2025-03-12',
      description: 'Esri DevSummit',
      externalUrl:
        'https://github.com/maxpatiiuk/esri-dev-summit-presentations/tree/main/2025/using-components-2#readme',
    },
    '2025-dev-summit-build-tooling': {
      ...base,
      title:
        'ArcGIS Maps SDK for JavaScript: Fast Development and Build Tooling',
      date: '2025-03-12',
      description: 'Esri DevSummit',
      externalUrl:
        'https://github.com/maxpatiiuk/esri-dev-summit-presentations/tree/main/2025/build-tooling#readme',
    },
    '2025-dev-summit-geo-io': {
      ...base,
      title: 'Gaming with ArcGIS Maps SDK for JavaScript - geo-io',
      date: '2025-03-11',
      description: 'Esri DevSummit',
      externalUrl: '/projects/geo-io',
    },
    '2024-dev-summit-calcite-react': {
      ...base,
      title: 'Building Web Apps with Calcite Design System and React',
      date: '2024-03-14',
      description: 'Esri DevSummit',
      externalUrl:
        'https://github.com/maxpatiiuk/esri-dev-summit-presentations/tree/main/2024/calcite-react#readme',
    },
    '2024-dev-summit-debugging-tips-and-tricks': {
      ...base,
      title:
        'ArcGIS Maps SDK for JavaScript: Tips and Tricks for Developing and Debugging Apps',
      date: '2024-03-13',
      description: 'Esri DevSummit',
      externalUrl:
        'https://github.com/maxpatiiuk/esri-dev-summit-presentations/tree/main/2024/debugging-tips-and-tricks#readme',
    },
    '2024-dev-summit-tetris-react': {
      ...base,
      title: 'Gaming with ArcGIS Maps SDK for JavaScript - 3D Tetris Game',
      date: '2024-03-12',
      description: 'Esri DevSummit',
      externalUrl: '/projects/tetris-react',
    },
    '2022-idigbio-web-accessibility': {
      ...base,
      title: 'Web Accessibility and Specify 7.7',
      date: '2022-03-25',
      description: 'iDigBio Digital Data Conference 2022',
      externalUrl: 'https://www.youtube.com/watch?v=YIbeZ_f_eQc&t=164s',
    },
    '2021-tdwg-publishing-apis': {
      ...base,
      title: 'A Case Study of Publishing Internal APIs to External Users',
      date: '2021-10-21',
      description: 'TDWG 2021',
      externalUrl: 'https://doi.org/10.3897/biss.5.75386',
    },
    '2021-scientific-seminar-siberia-specify-7': {
      ...base,
      title:
        'Specify 7: New capabilities and differences from Specify 6 (in Russian)',
      date: '2021-03-21',
      description: 'Scientific Seminar of Siberia 2021',
      externalUrl: 'https://www.youtube.com/watch?v=fw_Ps4nF5FY',
    },
    '2021-speciforum-specify-7-workbench': {
      ...base,
      title: 'Specify WorkBench demo',
      date: '2021-03-11',
      description: 'SpeciForum 2021',
      externalUrl: '/projects/workbench',
    },
    '2021-speciforum-specify-network': {
      ...base,
      title: 'Specify Network demo',
      date: '2021-03-11',
      description: 'SpeciForum 2021',
      externalUrl: '/projects/lifemapper',
    },
    '2021-speciforum-taxa-importer': {
      ...base,
      title: 'Taxa Importer demo',
      date: '2021-03-11',
      description: 'SpeciForum 2021',
      externalUrl: '/projects/taxa',
    },
  },
};

(indexPage as { pages: (typeof indexPage)['pages'] }).pages =
  talksCollection.pages;
