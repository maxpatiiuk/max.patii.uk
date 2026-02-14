# Monorepo Migration Progress

## Completed

### Step 1: Root monorepo scaffolding

- Created `pnpm-workspace.yaml` with `packages: ['packages/*']`
- Rewrote root `package.json`: removed all Next.js/React/Tailwind deps, added
  workspace scripts (`build`, `dev`, `lint`, `typecheck`, `prepare`), set
  `"packageManager": "pnpm@10.6.2"`
- Created `prettier.config.js` (renamed from `.prettierrc.js`, same content:
  singleQuote + proseWrap)
- Created `lint-staged.config.js` (eslint --fix + prettier --write for
  ts/js/md/json/yaml/css/html)
- Updated `eslint.config.js`: switched from `@maxxxxxdlp/eslint-config` +
  `@maxxxxxdlp/eslint-config-react` to `@arcgis/eslint-config` (flat config, no
  React rules). Uses `const { default: eslintConfig } = require(...)` because
  the package exports ESM default from CJS.
- Created `.prettierignore` with `pnpm-lock.yaml` (prettier rejects it via
  negative glob)
- Set up husky: `.husky/pre-commit` runs `pnpm exec lint-staged`
- Added `pnpm.onlyBuiltDependencies: ["esbuild"]` to root package.json to allow
  esbuild postinstall scripts
- Deleted `package-lock.json`, generated `pnpm-lock.yaml`

### Step 2: `@maxpatiiuk/typescript-config`

- `packages/typescript-config/package.json` — name, files: `["*.json"]`
- `base.json` — strict, ESNext module, Bundler resolution, ES2020 target,
  isolatedModules, skipLibCheck, incremental, declaration, noEmitHelpers,
  esModuleInterop
- `dom.json` — extends base, adds DOM/DOM.Iterable libs + experimentalDecorators
  (for Lit)
- `node.json` — extends base, NodeNext module/resolution

### Step 3: `@maxpatiiuk/web-components` content Lit components

- 11 Lit components, each in `src/components/<tag-name>/<tag-name>.ts`:
  - `mp-paragraph` — `<p>` + slot, padding-bottom
  - `mp-header` — `<h2>` + slot, neutral-400 color, pt-4
  - `mp-subheader` — `<h3>` + slot, pt-2
  - `mp-link` — `<a>` with `href` attribute, target=\_blank, underline
  - `mp-list` — `<ul>`/`<ol>` + slot, optional `caption` attribute, `type`
    attribute for ol
  - `mp-image` — `<figure>` + `<img>` (src/alt attrs) + `<figcaption>` slot,
    full-bleed with grid-column 1/-1
  - `mp-youtube` — iframe embed with playlist/loop workaround,
    `video`/`caption`/`start` attrs, SSR-safe document check
  - `mp-vimeo` — iframe embed, `video`/`caption` attrs
  - `mp-aside` — `<aside>` + slot, border-left accent, bg-neutral-700
  - `mp-full-bleed` — grid-column 1/-1 breakout container
  - `mp-button` — `<button>` + slot, optional `variant` attribute (danger)
- `src/index.ts` — barrel re-exporting all components
- All Tailwind utility classes translated to equivalent CSS in `static styles`
- All `render()` methods have explicit `TemplateResult` return type
- `vite.config.ts` — lib build, externalizes lit (for package consumption;
  portfolio Vite bundles lit with it). Has eslint-disable for defineConfig type
  issues.
- `tsconfig.json` extends `@maxpatiiuk/typescript-config/dom.json`
- Build: `vite build && tsc --emitDeclarationOnly` → `dist/index.js` (10.5KB)

### Step 5: `@maxpatiiuk/static-site-forge` Vite plugin

- `src/types.ts` — SiteConfig, PageFrontmatter, PageData, ForgeConfig types
- `src/markdown/scanner.ts` — **MOCKED** markdown-to-HTML. Splits on blank
  lines, wraps non-HTML blocks in `<mp-paragraph>`, passes HTML through
  unchanged. Real scanner (while-loop state machine) is TBD.
- `src/markdown/index.ts` — re-exports markdownToHtml
- `src/pages/resolver.ts` — discovers .md files in contentDir/projects/, parses
  YAML frontmatter (Map-based, simple key:value), calls markdownToHtml on body.
  Falls back to filename as slug.
- `src/pages/generator.ts` — writes HTML pages to outDir (project pages in
  projects/<slug>/index.html, index.html, 404.html), copies publicDir, generates
  additional pages from config
- `src/plugin.ts` — Vite plugin with:
  - `configureServer()` — serves generated HTML via middleware (home page at /,
    project pages at /projects/<slug>/), watches .md files for live reload via
    `server.ws.send({ type: 'full-reload' })`
  - `closeBundle()` — resolves pages and generates static site
- `tsconfig.json` extends `@maxpatiiuk/typescript-config/node.json`
- Has `@types/node` as devDep for fs/path APIs
- Build: `tsc` (compiles to dist/)

### Step 6: `@maxpatiiuk/portfolio` package

- `vite.config.ts` — imports static-site-forge plugin, configures contentDir,
  publicDir, outDir, passes render functions. Sets rollupOptions to output
  `js/web-components.js` at predictable path (no hash).
- `index.html` — minimal Vite entry point, loads `src/entry.ts`
- `src/entry.ts` — imports `@maxpatiiuk/web-components` to register all custom
  elements
- `src/config.ts` — siteConfig with title, description, keywords, author,
  baseUrl, themeColor, googleAnalyticsId, twitter, links array
- `src/project-order.ts` — ordered array of 25 project slugs
- `src/layouts/document.ts` — `htmlDocument()` generates full HTML shell with
  meta tags (og:title, og:description, og:image, twitter:card), GA script,
  stylesheet, web-components script
- `src/layouts/project.ts` — `renderProjectPage()` with nav row (back link +
  GitHub link with SVG icons), title, subtitle, content
- `src/layouts/home.ts` — `renderHomePage()` with sticky sidebar (name, title,
  nav links) + project listing sorted by project-order
- `src/layouts/error.ts` — `render404Page()`
- `public/styles/global.css` — CSS reset, dark theme (bg #171717, text #f5f5f5),
  project-layout grid (3-col with 64ch center), home-layout flex (responsive
  column→row), nav-link styles, responsive breakpoints
- `public/_redirects` — Cloudflare Pages redirect rules migrated from
  next.config.js
- `public/manifest.webmanifest` — static PWA manifest
- `src/content/projects/alia.md` — sample project post with frontmatter
- `src/content/projects/accessibility-refactor.md` — migrated project post
- Build pipeline verified: `pnpm build` produces dist/ with index.html,
  404.html, projects/alia/index.html, js/web-components.js (27KB with lit
  bundled), styles/global.css, \_redirects, manifest.webmanifest

## Issues encountered and resolved

- `@maxxxxxdlp/eslint-config` was not flat-config compatible (exported object,
  not array). Switched to `@arcgis/eslint-config` which exports ESM default
  array. Needed `const { default: eslintConfig } = require(...)` to import.
- ESLint required explicit `TemplateResult` return types on all Lit `render()`
  methods, unicode flag `/u` on all regexps, and no unnecessary optional
  chaining.
- Vite's `defineConfig` triggers `@typescript-eslint/no-unsafe-assignment` and
  `no-unsafe-call` in config files — suppressed with eslint-disable comments.
- `pnpm approve-builds` for esbuild required interactive input — solved with
  `pnpm.onlyBuiltDependencies` in package.json.
- Vite requires an `index.html` entry point even for SSG — created minimal one
  that loads entry.ts.
- Web-components dist externalizes lit (good for library, not for standalone
  browser use) — solved by having portfolio's Vite bundle everything together
  from entry.ts, outputting to predictable `js/web-components.js` path.
- SSG's `closeBundle` hook runs after Vite writes its index.html, so SSG's
  generated index.html correctly overwrites it.
- Prettier rejected pnpm-lock.yaml and pnpm-workspace.yaml via negative globs —
  added `.prettierignore`.

## Chores

- Converted root config files to ESM (`eslint.config.mjs`,
  `prettier.config.mjs`, `lint-staged.config.mjs`) and set root package to ESM
  (`"type": "module"`).
- Deleted `.github/dependabot.yml`.
- Removed `pnpm.onlyBuiltDependencies` from root `package.json` (now in
  `pnpm-workspace.yaml`).
- Added `globals` as a dev dependency for the ESLint config.
- Removed the web-components barrel by using per-component exports and
  multi-entry builds.
- Switched ESLint to TypeScript ESLint `projectService`.

## TODOS (added by human)

## Remaining work

- [ ] Migrate remaining 23 project posts from TSX to Markdown (alia done as
      sample). Conversion rules documented in plan file. Key: Paragraph→plain
      text, Header→##, SubHeader→###, Link→\[text\](url),
      Image→!\[caption\](path), List→- items, YouTube/Vimeo/Aside→HTML custom
      element tags in markdown.
- [ ] Interactive Lit components: mp-snow-crash (canvas animation, 3 modes),
      mp-stopwatch (state machine PWA), mp-shadow-game (game PWA). Port from
      React useReducer/useState/useEffect to Lit @state/@query/lifecycle.
- [ ] Move `public/projects/images/` from root to `packages/portfolio/public/`
- [ ] Delete old code: app/, components/, const/, lib/, next.config.js,
      next-env.d.ts, tailwind.config.js, postcss.config.js, .stylelintrc.js,
      .vercel/, root tsconfig.json
- [ ] Implement real markdown scanner (while-loop state machine) in
      static-site-forge
- [ ] Address human TODOs above (barrels, ESM configs, projectService, etc.)

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
- Plan file at `.claude/plans/breezy-leaping-feather.md` has full architectural
  details
