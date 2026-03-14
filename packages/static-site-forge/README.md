# @maxpatiiuk/static-site-forge

A static site generator. Inspired by Astro. Powered by Lit, Vite, and Markdown.
0-client side JS by default.

See [Portfolio project](https://max.patii.uk/projects/portfolio-forge) for more
details about static-site-forge.

## Architecture

- [./src/plugin.ts](./src/plugin.ts): The core Vite plugin that manages build
  environments (SSR/Client), dev server middleware, and file watching.
  [./src/markdown/](./src/markdown/): Markdown to lit-html transform
- [./src/runtime.ts](./src/cssLoader.ts): Page rendering

## Usage

See [../portfolio/vite.config.ts](../portfolio/vite.config.ts) and
[../portfolio/package.json](../portfolio/package.json).
