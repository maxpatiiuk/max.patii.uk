# Authoring a project page

## 1. Register the project

Add an entry to
[`packages/portfolio/src/pages/projects/projectsCollection.ts`](packages/portfolio/src/pages/projects/projectsCollection.ts):

```ts
'my-project': {
  title: 'My Project',
  description: 'One-line summary shown on the home page',
  gitHub: 'https://github.com/you/my-project', // optional
  siteConfig,
},
```

The key (`my-project`) becomes the URL slug: `/projects/my-project/`.

## 2. Create the markdown file

Create `packages/portfolio/src/pages/projects/my-project.md`. There is no
frontmatter — all metadata lives in `projectsCollection.ts`.

Start the body at `##` (h1 is rendered from `title`).

## 3. Add assets

Place images under:

```log
public/projects/images/my-project/1.webp
public/projects/images/my-project/2.webp
...
```

Use `.webp`. The first image in the file is automatically used as the OG image.

Reference images with a path relative to the `.md` file:

```md
![Alt text](../../../public/projects/images/my-project/1.webp)
```

---

## Markdown syntax

| Syntax         | Output                                   |
| -------------- | ---------------------------------------- |
| `## Heading`   | h2 (use ##–###### only, h1 is the title) |
| `**bold**`     | **bold**                                 |
| `_italic_`     | _italic_                                 |
| `~~strike~~`   | ~~strikethrough~~                        |
| `` `code` ``   | inline code                              |
| `[text](url)`  | link                                     |
| `![alt](path)` | image                                    |
| `- item`       | unordered list                           |
| `1. item`      | ordered list                             |
| `> quote`      | blockquote                               |
| `<hr>`         | horizontal rule                          |

**Code blocks** — use triple backticks. Language identifiers are accepted but
syntax highlighting is not rendered:

````md
```ts
const x = 1;
```
````

**Nested lists** — indent continuation lines to align with the item text:

```md
- Top level
  - Nested (2 spaces)
    - Deeper (4 spaces)

1. First
   1. Nested (3 spaces — aligns after "1. ")
```

**Escaping** — prefix with `\` to render a literal `*`, `_`, `` ` ``, etc.

**Not supported:** tables, reference-style links `[text][ref]`, images inside
links.

---

## Custom elements

Custom elements are imported automatically when used.

### YouTube embed

```html
<mp-youtube video="VIDEO_ID" caption="Section heading"></mp-youtube>
```

Optional `start` attribute (seconds):

```html
<mp-youtube video="VIDEO_ID" caption="Demo" start="42"></mp-youtube>
```

### Vimeo embed

```html
<mp-vimeo video="VIDEO_ID" caption="Section heading"></mp-vimeo>
```

### Aside / callout box

```html
<mp-aside>This is a callout note.</mp-aside>
```

Or as a blockquote (equivalent):

```md
> This is a callout note.
```

---

## Optional: inline JS header

A markdown file may open with a fenced code block that contains raw JavaScript.
It is injected verbatim into the compiled module — useful for one-off imports or
runtime logic. No existing project pages use this.

````md
```
import something from './something.js';
```

Normal markdown content starts here.
````
