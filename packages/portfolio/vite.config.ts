import { defineConfig } from 'vite';
import { useStaticSiteForge } from '@maxpatiiuk/static-site-forge/plugin.js';

export default defineConfig({
  plugins: [
    useStaticSiteForge({
      getWebComponentImportPath: (tagName) =>
        `@maxpatiiuk/web-components/components/${tagName}`,
    }),
  ],
});
