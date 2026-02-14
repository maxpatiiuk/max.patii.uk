import { defineConfig } from 'vite';
import { useStaticSiteForge } from '@maxpatiiuk/static-site-forge';

import { siteConfig } from './src/config.js';
import { renderProjectPage } from './src/layouts/project.js';
import { renderHomePage } from './src/layouts/home.js';
import { render404Page } from './src/layouts/error.js';
import { collections } from './src/collections.js';

export default defineConfig({
  plugins: [
    useStaticSiteForge({
      siteConfig,
      collections,
      renderPage: renderProjectPage,
      renderIndex: renderHomePage,
      render404: render404Page,
    }),
  ],
});
