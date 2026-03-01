import { defineConfig } from 'vite';
import { useApiExtractor } from '@arcgis/api-extractor/vite/plugin';
import { builtinModules } from 'node:module';

export default defineConfig(({ mode }) => ({
  build: {
    lib: {
      entry: {
        plugin: './src/plugin.ts',
        litHmrPatch: './src/litHmrPatch.ts',
        cssLoader: './src/cssLoader.ts',
        runtime: './src/runtime.ts',
      },
      formats: ['es'],
    },
    sourcemap: mode === 'development',
    minify: false,
    rollupOptions: {
      external: [
        ...builtinModules.map((module) => `node:${module}`),
        'vite',
        /^lit([-/]|$)/u,
        /^@lit([-/]|$)/u,
      ],
    },
  },
  plugins: [useApiExtractor()],
}));
