import { defineConfig } from 'vite';
import { useStaticSiteForge } from '@maxpatiiuk/static-site-forge';

export default defineConfig({
  plugins: [useStaticSiteForge()],
});
