# Monorepo Migration Progress

## Completed

- [x] Step 1: Root monorepo scaffolding
  - Created `pnpm-workspace.yaml`
  - Rewrote root `package.json` (removed all app deps, added workspace scripts)
  - Created `prettier.config.js` (renamed from `.prettierrc.js`)
  - Created `lint-staged.config.js`
  - Updated `eslint.config.js` (dropped React config)
  - Updated `.gitignore` (added `dist`)
  - Set up husky pre-commit hook
  - Ran `pnpm install` successfully

## In Progress

- [ ] Step 2: `@maxpatiiuk/typescript-config` package

## Remaining

- [ ] Step 3: `@maxpatiiuk/web-components` content Lit components
- [ ] Step 4: `@maxpatiiuk/web-components` interactive Lit components
- [ ] Step 5: `@maxpatiiuk/static-site-forge` Vite plugin SSG
- [ ] Step 6: `@maxpatiiuk/portfolio` package (layouts, config, content)
- [ ] Step 7: Migrate all 25 project posts from TSX to Markdown
- [ ] Step 8: Delete old Next.js/React/Tailwind code

## Architecture Notes

- All packages use `@maxpatiiuk/` npm scope
- All components use Lit (for SSR compatibility)
- Component file naming: `src/components/<full-tag-name>/<full-tag-name>.ts`
- static-site-forge is a Vite plugin (not a CLI)
- Layouts are Lit components (not HTML templates)
- Config files are type-safe `.ts` (not `.json`)
- Markdown scanner is mocked initially (while-loop state machine TBD)
- Targeting Cloudflare Pages (fully static output)
- Commits use `chore(area): description` format
