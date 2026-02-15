import { defineConfig } from 'vite';
import { useStaticSiteForge } from '@maxpatiiuk/static-site-forge';

import { siteConfig } from './src/config.js';
import { collections } from './src/collections.js';

export default defineConfig({
  plugins: [
    useStaticSiteForge({
      siteConfig,
      collections,
    }),
  ],
});
