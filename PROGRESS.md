## Immediate TODO

The collections architecture in static-site-forge needs to be improved.
Proposal:

- every page is an .md file
- add a collection for root pages too - the home page. and in the future the
  blogs and pages listing pages. those are .md files too. these pages in their
  .md will explicitly call a component like
  `<mp-home-page projects={collections.projects} />`
- rather than doing fs read file and transform, consider using vite's load and
  transform hook - resolve `/slug/` page import to an .md file from appropriate
  collection. then in transform() transform that .md file to a file that exports
  a lit-html template. permit writing import statements before the `---` (like
  in astro).
  - as part of transform, permit using web components explicitly in md (kind of
    like .mdx). but make them lit-html compatible - prefix every property with
    ., replace {} with ${} and unfold `/>`.
- use vite environments API - have a way to indicate if page should be
  pre-rendered statically entirely (full pre-render) or rendered on the client
  entirely (no ssr, besides the barebones html layout). evaluate the static
  pages on the server (vite's node environment in the vite environment api),
  rendering them to an html string, that is served in dev server or written to
  /dist/.
- for client pages, do regular vite behavior - bundle in deps, create chunks as
  needed (one per entry page). client pages will be defined as .tsx files. they
  may import react, web components, or any other front end library.

## Long term TODOs

Update root README.md - out of date

Use `import { globalIgnores } from "eslint/config";` in eslint. hardcode ignores
list based on gitignore and prettierignore
