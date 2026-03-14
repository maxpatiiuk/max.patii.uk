# max.patii.uk Monorepo

The source code and content for [max.patii.uk](https://max.patii.uk)

## Packages

- [@maxpatiiuk/portfolio](./packages/portfolio/README.md): Main website and
  markdown content.
- [@maxpatiiuk/static-site-forge](./packages/static-site-forge/README.md):
  Custom Vite-based static site generator.
- [@maxpatiiuk/web-components](./packages/web-components/README.md): Shared UI
  web components.

## Development

This project requires pnpm.

```bash
# Install dependencies
pnpm install

# Build all packages in dependency order
pnpm build

# Run the portfolio in dev mode
pnpm --filter portfolio start
```
