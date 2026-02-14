import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  build: {
    lib: {
      entry: {
        'components/mp-paragraph/mp-paragraph': resolve(
          import.meta.dirname,
          'src/components/mp-paragraph/mp-paragraph.ts',
        ),
        'components/mp-header/mp-header': resolve(
          import.meta.dirname,
          'src/components/mp-header/mp-header.ts',
        ),
        'components/mp-subheader/mp-subheader': resolve(
          import.meta.dirname,
          'src/components/mp-subheader/mp-subheader.ts',
        ),
        'components/mp-link/mp-link': resolve(
          import.meta.dirname,
          'src/components/mp-link/mp-link.ts',
        ),
        'components/mp-list/mp-list': resolve(
          import.meta.dirname,
          'src/components/mp-list/mp-list.ts',
        ),
        'components/mp-image/mp-image': resolve(
          import.meta.dirname,
          'src/components/mp-image/mp-image.ts',
        ),
        'components/mp-youtube/mp-youtube': resolve(
          import.meta.dirname,
          'src/components/mp-youtube/mp-youtube.ts',
        ),
        'components/mp-vimeo/mp-vimeo': resolve(
          import.meta.dirname,
          'src/components/mp-vimeo/mp-vimeo.ts',
        ),
        'components/mp-aside/mp-aside': resolve(
          import.meta.dirname,
          'src/components/mp-aside/mp-aside.ts',
        ),
        'components/mp-full-bleed/mp-full-bleed': resolve(
          import.meta.dirname,
          'src/components/mp-full-bleed/mp-full-bleed.ts',
        ),
        'components/mp-button/mp-button': resolve(
          import.meta.dirname,
          'src/components/mp-button/mp-button.ts',
        ),
        'components/mp-snow-crash/mp-snow-crash': resolve(
          import.meta.dirname,
          'src/components/mp-snow-crash/mp-snow-crash.ts',
        ),
        'components/mp-stopwatch/mp-stopwatch': resolve(
          import.meta.dirname,
          'src/components/mp-stopwatch/mp-stopwatch.ts',
        ),
        'components/mp-shadow-game/mp-shadow-game': resolve(
          import.meta.dirname,
          'src/components/mp-shadow-game/mp-shadow-game.ts',
        ),
      },
      formats: ['es'],
      fileName: (_format, entryName) => `${entryName}.js`,
    },
    rollupOptions: {
      external: ['lit', 'lit/decorators.js'],
    },
  },
});
