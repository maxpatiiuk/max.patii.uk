# @maxpatiiuk/portfolio

The main website and content for [max.patii.uk](https://max.patii.uk/).

This project is powered by my static site framework,
[static-site-forge](../static-site-forge/), and UI web components,
[../web-components](../web-components/).

## Authoring a New Page

Create a markdown file in [src/pages/projects](./src/pages/projects/) or
[src/pages/articles](./src/pages/articles/). Markdown file should include just
the content, without title or frontmatter.

The title and metadata for the page should be defined in
[src/pages/projects/projectsCollection.ts](./src/pages/projects/projectsCollection.ts)
or
[src/pages/articles/articlesCollection.ts](./src/pages/articles/articlesCollection.ts).
Rely on TypeScript to see list of available metadata fields.

## Supported Markdown Syntax

- **Headings**: `##` to `######` (H1 is automatically generated from the title).
- **Emphasis**: `**bold**`, `_italic_`, `~~strikethrough~~`.
- **Lists**: Unordered (`-`) and Ordered (`1.`). Supports infinite nesting via
  indentation.
- **Links & Images**: `[text](url)` and `![alt](path)`.
- **Code**: Inline `` `code` `` and Fenced blocks (triple backticks).
- **Quotes**: `> Blockquote` (rendered as aside callouts in some layouts).
- **Horizontal Rule**: `<hr>`.
- **Escaping**: Use `\` to escape special characters like `\*` or `\_`.

### Custom Elements

You can use specialized Lit components directly in Markdown:

- **YouTube**: `<mp-youtube video="ID" caption="Title" start="42"></mp-youtube>`
- **Vimeo**: `<mp-vimeo video="ID" caption="Title"></mp-vimeo>`

### Inline JS Header (Advanced)

You can include an optional fenced code block at the very top of the file for
imports or runtime logic:

````markdown
```js
import { name } from './something.js';
```

${name} starts here...
````

### Images

Place images in `packages/portfolio/public/projects/images/<slug>/`. Convert
images to `.avif` using https://tinypng.com/ for efficiency.

Reference them in Markdown using relative paths:

```markdown
![Description](../../../public/projects/images/my-new-page/1.webp)
```

## Development

```bash
# Start the dev server with live reload
pnpm start

# Build the static site
pnpm build

# Preview the production build
pnpm preview
```
