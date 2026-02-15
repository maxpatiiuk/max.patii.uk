import { defineConfig } from 'vite';
import { useApiExtractor } from '@arcgis/api-extractor/vite/plugin';
import { builtinModules } from 'node:module';

export default defineConfig(({ mode }) => ({
  build: {
    lib: {
      entry: {
        index: './src/index.ts',
      },
      formats: ['es'],
    },
    sourcemap: mode === 'development',
    minify: false,
    rollupOptions: {
      external: [
        ...builtinModules.map((module) => `node:${module}`),
        'vite',
        'lit',
        /^@lit-labs\/ssr/u,
      ],
    },
  },
  plugins: [useApiExtractor()],
}));
