import { defineConfig } from 'vite';
import { useLumina } from '@arcgis/lumina-compiler';
import { playwright } from '@vitest/browser-playwright';

export default defineConfig({
  plugins: [
    useLumina({
      build: { cdn: { skip: true } },
      apiExtractor: { unsafeConfigOverride: { strict: true } },
    }),
  ],
  test: { browser: { provider: playwright() } },
});
