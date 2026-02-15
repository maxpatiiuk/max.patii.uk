# Plan: Convert Next.js Portfolio to pnpm Monorepo

## Context

The current portfolio at `max.patii.uk` is a Next.js 14 app with React, Tailwind
CSS, and 25 project posts defined as `.tsx` files. The goal is to replace all of
this with a pnpm monorepo containing: a shared TypeScript config, Lit Web
Components (with Lit SSR support), a custom Vite-plugin-based static site
generator ("static-site-forge" with a hand-rolled markdown-to-HTML scanner), and
the portfolio site itself — all without React, Next.js, Tailwind, or shadcn.
Targeting Cloudflare Pages for fully static deployment.

## Target Monorepo Structure

```log
max.patii.uk/
├── pnpm-workspace.yaml
├── package.json                    # root: lint-staged, eslint, prettier, husky
├── eslint.config.js                # shared base ESLint (no React rules)
├── prettier.config.js              # shared Prettier config
├── lint-staged.config.js           # lint-staged config
├── packages/
│   ├── typescript-config/          # @maxpatiiuk/typescript-config
│   ├── web-components/             # @maxpatiiuk/web-components (all Lit)
│   ├── static-site-forge/          # @maxpatiiuk/static-site-forge (Vite plugin)
│   └── portfolio/                  # @maxpatiiuk/portfolio
```

**Dependency graph:**

```log
typescript-config  (no deps)
       ↓
web-components  (← typescript-config, lit)
       ↓
static-site-forge  (← typescript-config, vite)
       ↓
  portfolio      (← static-site-forge, web-components)
```

---

## Step 1: Root Monorepo Scaffolding

- Create `pnpm-workspace.yaml` with `packages: ['packages/*']`
- Rewrite root `package.json`: remove all deps, add workspace scripts (`build`,
  `dev`, `lint`, `typecheck`), add `"packageManager": "pnpm@10.x.x"`
- Delete `package-lock.json`
- Add `husky` + `.husky/pre-commit` running `pnpm exec lint-staged`
- Create `lint-staged.config.js` (eslint --fix + prettier --write for
  ts/js/md/json/yaml/css/html)
- Rename `.prettierrc.js` → `prettier.config.js`
- Update `eslint.config.js`: keep `@maxxxxxdlp/eslint-config` base, drop
  `@maxxxxxdlp/eslint-config-react` (no more React)
- Root devDeps: `eslint`, `prettier`, `lint-staged`, `husky`, `typescript`

## Step 2: `@maxpatiiuk/typescript-config`

**Location:** `packages/typescript-config/`

Create shared tsconfig JSON files:

- `base.json` — strict mode, ESNext module, Bundler resolution, ES2020 target,
  `isolatedModules`, `skipLibCheck` (extracted from current
  [tsconfig.json](tsconfig.json))
- `dom.json` — extends base, adds DOM libs + `experimentalDecorators` (for Lit
  decorators)
- `node.json` — extends base, NodeNext module/resolution (for the Vite plugin)
- `package.json` — `name: "@maxpatiiuk/typescript-config"`, `files: ["*.json"]`

## Step 3: `@maxpatiiuk/web-components` — All Lit Components

**Location:** `packages/web-components/`

**All components use Lit** (not plain custom elements) so that Lit SSR works
uniformly.

### File Naming Convention

All components follow `src/components/<full-tag-name>/<full-tag-name>.ts`:

```log
src/components/
  mp-paragraph/mp-paragraph.ts
  mp-header/mp-header.ts
  mp-link/mp-link.ts
  mp-snow-crash/mp-snow-crash.ts
  mp-stopwatch/mp-stopwatch.ts
  ...
```

### Content Components

Convert the atoms from
[components/Atoms/Project.tsx](components/Atoms/Project.tsx) into Lit elements:

| React Component | Lit Element   | Tag                                                  |
| --------------- | ------------- | ---------------------------------------------------- |
| `Paragraph`     | `MpParagraph` | `<mp-paragraph>`                                     |
| `Header`        | `MpHeader`    | `<mp-header>`                                        |
| `SubHeader`     | `MpSubheader` | `<mp-subheader>`                                     |
| `Link`          | `MpLink`      | `<mp-link href="...">`                               |
| `List`          | `MpList`      | `<mp-list caption="...">`                            |
| `Image`         | `MpImage`     | `<mp-image src="..." alt="...">`                     |
| `YouTube`       | `MpYoutube`   | `<mp-youtube video="..." caption="..." start="...">` |
| `Vimeo`         | `MpVimeo`     | `<mp-vimeo video="..." caption="...">`               |
| `Aside`         | `MpAside`     | `<mp-aside>`                                         |
| `FullBleed`     | `MpFullBleed` | `<mp-full-bleed>`                                    |
| `Button`        | `MpButton`    | `<mp-button variant="...">`                          |

All Tailwind utility classes become equivalent CSS in each component's
`static styles`.

### Interactive Components

| Current Source                                                | Lit Component  | Tag                                             |
| ------------------------------------------------------------- | -------------- | ----------------------------------------------- |
| [SnowCrash.tsx](app/projects/canvas/snow-crash/SnowCrash.tsx) | `MpSnowCrash`  | `<mp-snow-crash mode="binary\|grayscale\|hex">` |
| [Stopwatch.tsx](app/projects/pwa/stopwatch/Stopwatch.tsx)     | `MpStopwatch`  | `<mp-stopwatch>`                                |
| [ShadowGame.tsx](app/projects/pwa/shadow-game/ShadowGame.tsx) | `MpShadowGame` | `<mp-shadow-game>`                              |

- SnowCrash: `@query('canvas')` for canvas ref, `@state()` for pause, lifecycle
  callbacks for animation loop + resize
- Stopwatch: port the state machine from `typesafe-reducer` to plain TS
- ShadowGame: port `useReducer` state machine to Lit reactive state

Shop page is static content — just a plain HTML page from the SSG.

### Build

**Vite + tsc** (not esbuild):

- `vite.config.ts` for bundling → `dist/web-components.js` (ESM bundle)
- Also produce standalone interactive bundles (`dist/interactive/*.js`)
- `tsc` for type checking only (`--noEmit`)
- tsconfig extends `@maxpatiiuk/typescript-config/dom.json`

## Step 4: `@maxpatiiuk/static-site-forge` — Vite Plugin SSG

**Location:** `packages/static-site-forge/`

This is a **Vite plugin** (not a standalone CLI). The portfolio's
`vite.config.ts` imports and uses it.

### Architecture

```log
src/
  index.ts              # exports the Vite plugin function
  plugin.ts             # Vite plugin implementation (configureServer, generateBundle)
  markdown/
    scanner.ts          # while-loop state machine tokenizer (MOCKED initially)
    renderer.ts         # token stream → HTML string
    index.ts            # public API: markdownToHtml()
  pages/
    resolver.ts         # discover .md content files, parse frontmatter
    generator.ts        # generate HTML pages from Lit components
  types.ts              # shared types
```

### No HTML Templates — Lit Elements for Layouts

Instead of `.html` template files, layouts are defined as **Lit components** in
the portfolio package (or in static-site-forge as base classes). This gives type
safety and ergonomic composition:

```typescript
// In portfolio package - layouts/ProjectLayout.ts
@customElement('mp-project-layout')
export class ProjectLayout extends LitElement {
  @property() title = '';
  @property() description = '';
  @property() gitHub?: string;

  static styles = css`...`;

  render() {
    return html`
      <main class="project-layout">
        <header>
          <a href="/">← Back</a>
          ${this.gitHub ? html`<a href="${this.gitHub}">GitHub</a>` : nothing}
          <h1>${this.title}</h1>
          <p>${this.description}</p>
        </header>
        <slot></slot>
      </main>
    `;
  }
}
```

The Vite plugin's job:

1. At build time, discover `.md` files in the content directory
2. Parse YAML frontmatter (simple key:value scanner)
3. Run `markdownToHtml()` on the body (mocked initially — returns raw text
   wrapped in `<p>`)
4. Use Lit SSR (`@lit-labs/ssr`) to render layouts with content injected
5. Wrap in a full HTML document shell (with `<script>` tags for hydration, GA,
   etc.)
6. Output static `.html` files to the build output

### Dev Server with Live Reload

The Vite plugin hooks into `configureServer` to provide live reload during
development:

- Watch `.md` content files for changes (`server.watcher.add()`)
- Watch layout Lit component files
- On change: re-run the markdown transform + page generation, then trigger
  `server.ws.send({ type: 'full-reload' })` for a full page reload
- HMR is not critical, but live reload on content/layout changes is required
- Serve generated HTML via Vite's middleware (`server.middlewares.use()`)

### SEO / Meta

SEO metadata is defined per-page via frontmatter fields in `.md` files:

```yaml
---
title: Spacetime
description: My Amazon Internship Project
gitHub: https://github.com/maxpatiiuk/spacetime
ogImage: /projects/images/spacetime/1.webp
---
```

The Vite plugin generates `<head>` content (title, meta description, og:title,
og:description, og:image, twitter:card) from these fields. Site-wide defaults
come from a type-safe `.ts` config in the portfolio package:

```typescript
// packages/portfolio/src/config.ts
export const siteConfig = {
  title: 'Max Patiiuk',
  description: 'Senior SDE at Esri',
  baseUrl: 'https://max.patii.uk',
  themeColor: '#001122',
  googleAnalyticsId: 'G-36ESPJ8S03',
  twitter: '@maxpatiiuk',
  // ...
} as const;
```

### Google Analytics

Injected as a raw `<script>` in the HTML document shell generated by the plugin:

```html
<script
  async
  src="https://www.googletagmanager.com/gtag/js?id=G-36ESPJ8S03"
></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag('js', new Date());
  gtag('config', 'G-36ESPJ8S03');
</script>
```

### Markdown Scanner (Mocked Initially)

The markdown-to-HTML transformer uses a **scanner while-loop state machine**
pattern:

- Single pass through the input string
- Character-by-character scanning with lookahead
- State transitions for: paragraph, heading, list, code, bold, italic, link,
  image, HTML block
- **Left mocked** until the rest of the architecture is in place — initial mock
  just wraps content in `<mp-paragraph>` tags, splitting on blank lines

## Step 5: `@maxpatiiuk/portfolio` — Content & Site

**Location:** `packages/portfolio/`

### Structure

```log
packages/portfolio/
  vite.config.ts            # imports static-site-forge plugin
  src/
    config.ts               # site metadata (type-safe, not .json)
    project-order.ts        # display order array (type-safe)
    layouts/
      ProjectLayout.ts      # Lit element for project pages
      HomeLayout.ts         # Lit element for home page
      PwaLayout.ts          # Lit element for full-screen PWA pages
      BaseDocument.ts       # HTML document shell generator
    content/
      projects/             # 25 .md files (rewritten from TSX)
    pages/
      shop.ts               # shop redirect page content
  public/
    projects/images/         # all project images (WebP) — moved from root
    projects/pwa/            # PWA manifests & icons
    favicon.ico
    manifest.webmanifest     # static (replaces app/manifest.ts)
  styles/
    global.css               # minimal reset + dark theme + layout
```

### TSX → Markdown Conversion Rules

| TSX Pattern                             | Markdown                                              |
| --------------------------------------- | ----------------------------------------------------- |
| `<Paragraph>text</Paragraph>`           | Plain paragraph (blank-line separated)                |
| `<Header>text</Header>`                 | `## text`                                             |
| `<SubHeader>text</SubHeader>`           | `### text`                                            |
| `<Link href="url">text</Link>`          | `[text](url)`                                         |
| `<Image source={var}>caption</Image>`   | `![caption](/projects/images/slug/N.webp)`            |
| `<List><li>A</li></List>`               | `- A`                                                 |
| `<List caption="intro:">`               | `intro:\n\n- A`                                       |
| `<YouTube video="ID" caption="text" />` | `<mp-youtube video="ID" caption="text"></mp-youtube>` |
| `<Vimeo video="ID" caption="text" />`   | `<mp-vimeo video="ID" caption="text"></mp-vimeo>`     |
| `<Aside><p>text</p></Aside>`            | `<mp-aside>\n\ntext\n\n</mp-aside>`                   |

### Deployment — Cloudflare Pages

Fully static output. No Vercel.

- All redirects handled via `_redirects` file (Cloudflare Pages format) or
  `_headers`
- Migrated from current [next.config.js](next.config.js) redirects
- Google Analytics included via `<script>` tag
- Static `manifest.webmanifest` for PWA support

## Step 6: Delete Old Code

After migration is verified:

- `app/` directory (entirely replaced by portfolio layouts + content)
- `components/` directory (replaced by web-components package)
- `const/` directory (content moved to .md, config to .ts)
- `lib/types.ts`
- `next.config.js`, `next-env.d.ts`
- `tailwind.config.js`, `postcss.config.js`, `.stylelintrc.js`
- `package-lock.json`, `.next/`, `.vercel/`
- `public/` at root (moved into portfolio package)
- Root `tsconfig.json` (replaced by per-package configs)

**Deps removed:** `next`, `react`, `react-dom`, `@next/third-parties`,
`typesafe-reducer`, `autoprefixer`, `postcss`, `tailwindcss`, `sharp`,
`@maxxxxxdlp/eslint-config-react`, `@types/react`, `@types/react-dom`

## Known Challenges

1. **Lit SSR** — `@lit-labs/ssr` is needed for the Vite plugin to render Lit
   components to HTML at build time. Requires careful setup of the Lit SSR
   environment in Node.js.
2. **Image dimensions** — Need to read dimensions at build time to prevent
   layout shift.
3. **Nested lists** — Scanner must handle indentation-based nesting.
4. **HTML passthrough** — Multi-line HTML blocks in markdown must not be split
   into paragraphs.
5. **OG image extraction** — Parse first `![](...)` from each markdown at build
   time.

## Progress Tracking

Work progress will be tracked in `PROGRESS.md` (checked into git). This file
will be kept updated as work proceeds so that context is preserved across
sessions.

## Commit Strategy

Commits are made after each functional step using the format
`chore(area): description`. Examples:

- `chore(monorepo): initialize pnpm workspace and root tooling`
- `chore(typescript-config): add shared tsconfig package`
- `chore(web-components): add content Lit components`
- `chore(static-site-forge): add Vite plugin with mocked markdown`
- `chore(portfolio): add layouts and initial content`

## Verification

1. `pnpm install` succeeds from clean state
2. `pnpm build` builds all 4 packages in dependency order
3. `pnpm --filter @maxpatiiuk/portfolio dev` serves the site locally via Vite
4. Visual comparison: every project page matches the current live site's layout
5. All 25 project pages render correctly (images, videos, lists, asides)
6. Interactive components work: SnowCrash animation, Stopwatch timer, Shadow
   Game
7. All redirects resolve correctly via `_redirects`
8. `pnpm lint` and `pnpm typecheck` pass
9. Static output deploys to Cloudflare Pages

---

PROGRESS doc:

## Monorepo Migration Progress

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
- `src/content/projects/battleship.md` — migrated project post
- `src/content/projects/calendar-plus.md` — migrated project post
- `src/content/projects/geo-io.md` — migrated project post
- `src/content/projects/goodreads-stats.md` — migrated project post
- `src/content/projects/interface-redesign.md` — migrated project post
- `src/content/projects/lifemapper.md` — migrated project post
- `src/content/projects/modernizing-usage-stats.md` — migrated project post
- `src/content/projects/open-api.md` — migrated project post
- `src/content/projects/pixelland.md` — migrated project post
- `src/content/projects/portfolio.md` — migrated project post
- `src/content/projects/project-ephemeris.md` — migrated project post
- `src/content/projects/query-builder.md` — migrated project post
- `src/content/projects/small-retail-management.md` — migrated project post
- `src/content/projects/socksy-linen.md` — migrated project post
- `src/content/projects/spacetime.md` — migrated project post
- `src/content/projects/specify7-test-panel.md` — migrated project post
- `src/content/projects/taxa.md` — migrated project post
- `src/content/projects/tetris-react.md` — migrated project post
- `src/content/projects/text-hoarder.md` — migrated project post
- `src/content/projects/tts-king.md` — migrated project post
- `src/content/projects/usage-stats.md` — migrated project post
- `src/content/projects/weblate.md` — migrated project post
- `src/content/projects/workbench.md` — migrated project post
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
- Converted interactive components to Lumina TSX format.

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
