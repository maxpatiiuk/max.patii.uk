# Monorepo Migration Progress

## Completed

- [x] Step 1: Root monorepo scaffolding
  - pnpm-workspace.yaml, root package.json, prettier.config.js,
    lint-staged.config.js, eslint.config.js (using @arcgis/eslint-config), husky
    pre-commit, .prettierignore
- [x] Step 2: `@maxpatiiuk/typescript-config` package
  - base.json, dom.json, node.json shared tsconfigs
- [x] Step 3: `@maxpatiiuk/web-components` content Lit components
  - 11 components: mp-paragraph, mp-header, mp-subheader, mp-link, mp-list,
    mp-image, mp-youtube, mp-vimeo, mp-aside, mp-full-bleed, mp-button
  - Built with Vite + tsc, styles converted from Tailwind to shadow DOM CSS
- [x] Step 5: `@maxpatiiuk/static-site-forge` Vite plugin
  - Vite plugin with configureServer (live reload) and closeBundle (static gen)
  - Markdown scanner mocked (wraps in mp-paragraph, HTML passthrough)
  - Frontmatter parser using Map-based approach
  - Page resolver discovers .md files and parses them
  - Page generator writes HTML output + copies assets
- [x] Step 6: `@maxpatiiuk/portfolio` package
  - Layouts: document.ts (full HTML shell with GA, meta, etc.), project.ts,
    home.ts, error.ts
  - Config: config.ts (site metadata), project-order.ts
  - Sample content: alia.md
  - Vite config wired up with static-site-forge plugin
  - Output: js/web-components.js (27KB bundled), styles/global.css, \_redirects
    (Cloudflare Pages), manifest.webmanifest
  - Full build pipeline verified end-to-end

## In Progress

- [ ] Step 7: Migrate all 25 project posts from TSX to Markdown

## Remaining

- [ ] Step 4: `@maxpatiiuk/web-components` interactive Lit components
      (SnowCrash, Stopwatch, ShadowGame)
- [ ] Step 8: Delete old Next.js/React/Tailwind code
- [ ] Move public/ images from root to portfolio package

## Architecture Notes

- All packages use `@maxpatiiuk/` npm scope
- All components use Lit (for SSR compatibility)
- Component file naming: `src/components/<full-tag-name>/<full-tag-name>.ts`
- static-site-forge is a Vite plugin (not a CLI)
- Layouts are TypeScript functions generating HTML strings (Lit SSR planned
  later)
- Config files are type-safe `.ts` (not `.json`)
- Markdown scanner is mocked initially (while-loop state machine TBD)
- Targeting Cloudflare Pages (fully static output)
- Commits use `chore(area): description` format
- ESLint uses @arcgis/eslint-config (flat config, no React rules)
- Vite bundles web-components + lit into a single js/web-components.js at a
  predictable path (no hash) for SSG pages to reference
