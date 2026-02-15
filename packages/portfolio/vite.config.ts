import { defineConfig } from 'vite';
import { useStaticSiteForge } from '@maxpatiiuk/static-site-forge';
import { collections } from './src/collections';

export default defineConfig({
  plugins: [
    useStaticSiteForge({
      collections,
    }),
  ],
});
