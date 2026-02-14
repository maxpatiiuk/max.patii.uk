import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { useStaticSiteForge } from '@maxpatiiuk/static-site-forge';

import { siteConfig } from './src/config.js';
import { renderProjectPage } from './src/layouts/project.js';
import { renderHomePage } from './src/layouts/home.js';
import { render404Page } from './src/layouts/error.js';

const root = import.meta.dirname;

export default defineConfig({
  publicDir: resolve(root, 'public'),
  build: {
    outDir: resolve(root, 'dist'),
    rollupOptions: {
      output: {
        entryFileNames: 'js/web-components.js',
      },
    },
  },
  plugins: [
    useStaticSiteForge({
      contentDir: resolve(root, 'src/content'),
      publicDir: resolve(root, 'public'),
      outDir: resolve(root, 'dist'),
      siteConfig,
      renderPage: renderProjectPage,
      renderIndex: renderHomePage,
      render404: render404Page,
    }),
  ],
});
