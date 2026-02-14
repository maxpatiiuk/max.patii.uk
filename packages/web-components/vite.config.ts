import { defineConfig } from 'vite';
import { useLumina } from '@arcgis/lumina-compiler';
import { playwright } from '@vitest/browser-playwright';

export default defineConfig({
  plugins: [useLumina()],
  test: { browser: { provider: playwright() } },
});
