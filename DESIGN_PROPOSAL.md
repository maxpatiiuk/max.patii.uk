# Design Proposal: Improved Collections Architecture

## Overview

Replace the current manual `readFile` + `markdownToHtml` pipeline with a
Vite-native architecture where `.md` files are first-class modules. Every page
(including home, 404, and project pages) is an `.md` file that goes through
Vite's `transform` hook, producing a JS module that exports a lit-html template.
The plugin evaluates these modules server-side via the Vite Environments API and
renders them to HTML strings using Lit SSR.

### Goals

- **Single content model** &mdash; every page is a `.md` file, no special cases
- **Vite-native module graph** &mdash; `.md` files go through `transform`,
  getting automatic HMR and dependency tracking
- **Vite Environments API** &mdash; use the modern Vite 6+ API for server-side
  module evaluation (replacing the deprecated `ssrLoadModule`)
- **0 JS by default** &mdash; ship zero JavaScript for most pages; no
  client-side hydration for static content
- **Property binding** &mdash; component invocations in markdown use `{expr}`
  syntax; the transform auto-adds Lit's `.` property prefix and `${}`
  interpolation
- **Lit SSR** &mdash; components are server-rendered with declarative shadow
  DOM, providing SEO-visible content and no layout shift
- **Interactive Islands** &mdash; interactive components are skipped during SSR
  (0 SSR) to avoid hydration complexity and issues

### Non-goals

- Virtual modules &mdash; keep the architecture simple and predictable by using
  explicit `collections.ts` files
- Frontmatter in `.md` &mdash; metadata lives in `collections.ts` to keep
  content files pure and avoid duplication
- MDX compatibility &mdash; this remains a custom format optimized for Lit SSR

---

## 1. Markdown File Format

Every page is a `.md` file with two optional sections:

```md
import '@maxpatiiuk/web-components/components/mp-project-header';

<mp-project-header title="Project Title" />

The project content goes here...
```

### Sections

1. **Imports**: Standard ES import statements at the top of the file. These
   become module-level imports in the compiled output.

2. **Body**: Markdown content with support for inline HTML / web component tags.
   Processed by the markdown scanner, then post-processed for component syntax
   transforms.

### Metadata

Metadata (title, description, layout) is defined in
`packages/portfolio/src/collections.ts`. This file maps slugs to their metadata
and layout components.

---

## 2. Transform Pipeline

The `transform` Vite plugin hook converts `.md` files into JS modules.

### Input

```md
<mp-example-component prop={someValue} />

# Hello World
```

### Output (compiled JS module)

```js
import { html } from 'lit';

export function render(context) {
  return html`
    <mp-example-component .prop=${context.someValue}></mp-example-component>
    <h1>Hello World</h1>
  `;
}
```

### Transform Steps

1. **Parse imports**: Extract import statements from the top of the file.

2. **Process markdown body**: Run `markdownToHtml()` on the rest of the file.

3. **Apply component syntax transforms**:
   - Find custom element tags (`[a-z]+-[a-z0-9-]*`)
   - Transform attributes: `name={expr}` → `.name=${expr}`
   - Unfold self-closing `/>` → `></tag-name>`

4. **Generate JS module**: Combine imports, the `render` function, and Lit's
   `html` tag.

### HMR Integration

Because `.md` files go through Vite's `transform` hook, they are part of the
module graph. When a `.md` file changes on disk:

1. Vite detects the change via its built-in file watcher
2. The `transform` hook re-runs automatically
3. The `hotUpdate` hook (see dev server section) triggers a full page reload

No manual file watching with `server.watcher.add()` is needed for files that go
through the transform pipeline.

---

## 3. Collections Architecture

Instead of virtual modules or frontmatter, metadata and structure are defined in
an explicit `packages/portfolio/src/collections.ts` file.

### Structure

```typescript
export const collections = {
  projects: {
    spacetime: {
      title: 'Spacetime',
      description: '...',
      layout: () => import('./layouts/project-layout'),
    },
    // ...
  },
};
```

### Layout property

The `layout` property is a function that returns a dynamic import of a web
component. This allows the SSR engine to load only the necessary layout
component for a given page.

---

## 4. SSR Rendering with Lit SSR

### Vite Environments API

The plugin uses the Vite Environments API to evaluate modules in a server
environment. This is more robust than `ssrLoadModule` and is the future of Vite
SSR.

```typescript
const environment = server.environments.ssr;
const mod = await environment.runModule('/src/pages/projects/spacetime.md');
// mod.render(context) -> TemplateResult
```

### 0 SSR for Interactive Islands

To keep the system simple and avoid hydration issues, interactive components
(islands) render nothing or a simple placeholder during SSR. They are
initialized only on the client.

```typescript
import { isServer } from 'lit';

render() {
  if (isServer) return html`<div class="placeholder"></div>`;
  return html`<interactive-canvas-game></interactive-canvas-game>`;
}
```

### Rendering Pipeline

1. **Resolve URL**: Map the request URL to a slug and find its metadata in
   `collections.ts`.
2. **Load Module**: Use the Environments API to load the `.md` module.
3. **Load Layout**: Execute the `layout()` function from `collections.ts` and
   load the layout component.
4. **Render**:
   - Render the `.md` content using Lit SSR.
   - Pass the rendered content as a property to the layout component.
   - Render the layout component (which includes `<html>`, `<head>`, etc.).
5. **Collect Results**: Convert the Lit SSR iterable into a final HTML string.

---

## 5. Layout System

Layouts are implemented as web components. Since they are rendered via Lit SSR
and no HTML parser is invoked, it is safe for them to emit the entire document
structure, including `<html>`, `<head>`, and `<script>` tags.

### Example Layout Component

```typescript
@customElement('mp-project-layout')
export class ProjectLayout extends LitElement {
  @property() content = '';
  @property() title = '';

  render() {
    return html`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <title>${this.title}</title>
          <link rel="stylesheet" href="/styles/global.css" />
        </head>
        <body>
          <mp-header></mp-header>
          <main>${unsafeHTML(this.content)}</main>
        </body>
      </html>
    `;
  }
}
```

---

## 6. Dev Server

### HMR and Invalidation

Vite automatically handles invalidation of `.md` modules when they change
because they are part of the module graph. The `hotUpdate` hook is used to
trigger a full page reload in the browser to reflect SSR changes, as there is no
client-side hydration to perform fine-grained HMR for the content.

```typescript
hotUpdate({ file, server }) {
  if (file.endsWith('.md')) {
    server.ws.send({ type: 'full-reload' });
  }
}
```

### Middleware

The dev server uses a post-middleware to catch page requests, perform the SSR
pipeline, and serve the resulting HTML.

---

## 7. Build Pipeline

The build pipeline iterates over all pages defined in `collections.ts`, performs
the SSR rendering for each, and writes the resulting `.html` files to the output
directory.

1. **Pre-render**: Scan `collections.ts` for all slugs.
2. **Bundle**: Build the client-side assets (for interactive components).
3. **Generate**: For each slug, run the SSR pipeline and save to
   `dist/<slug>/index.html`.

---

## 8. Changes by Package

### `@maxpatiiuk/static-site-forge`

- **`src/transform.ts`**: Implements the `.md` to Lit-JS transform.
- **`src/plugin.ts`**:
  - Implements `transform` hook.
  - Implements `configureServer` with Environments API SSR middleware.
  - Implements `buildEnd` or `closeBundle` logic for static site generation.
- **`src/ssr.ts`**: Helper for Lit SSR execution.

### `@maxpatiiuk/portfolio`

- **`src/collections.ts`**: The single source of truth for all pages and
  metadata.
- **`src/pages/`**: Contains only pure `.md` files (no frontmatter).
- **`src/layouts/`**: Web components for the different layouts.
- **`src/entry.ts`**: Client-side entry point that imports interactive
  components.

### `@maxpatiiuk/web-components`

- **Interactive Components**: Updated with `isServer` checks to skip SSR.
- **`.tsx` extension**: Used for components to allow for future JSX usage and
  better IDE support.

---

## 9. Migration Steps

1. **Implement Transform**: Create the `.md` transformer in `static-site-forge`.
2. **Update Collections**: Move metadata from `.md` frontmatter to
   `packages/portfolio/src/collections.ts`.
3. **Convert Layouts**: Rewrite existing layouts as web components.
4. **Update Plugin**: Switch to the Vite Environments API in
   `static-site-forge/src/plugin.ts`.
5. **Interactive Islands**: Add `isServer` guards to components like
   `mp-snow-crash`.
6. **Verify**: Run `pnpm dev` and ensure all pages render with 0 JS for static
   content and working interactivity for islands.

---

## 10. Open Questions

1. **Environment configuration**: How to best configure the `ssr` environment in
   Vite to match the requirements of Lit SSR and the forge plugin?
2. **Performance**: Is there a need for caching rendered HTML during
   development, or is Lit SSR fast enough for the 25+ project pages?
3. **DSD Polyfill**: Determine if a declarative shadow DOM polyfill is needed
   for older browser support, or if the current target browsers are sufficient.
