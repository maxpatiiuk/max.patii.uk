> TLDR:
>
> - Elegant and performant portfolio static site.
> - Powered by my own static-site-generator. Zero client-side JavaScript.
> - Built on standards-compliant and accessible web components.

I was recently learning Astro. I wanted to understand more deeply how it works
and the reasons behind its design decisions. The best way to do so is to
implement my own Astro clone. I then proceeded to create a portfolio static site
using it.

## Static Site Forge

My static site generator is called Static Site Forge. Features:

- Zero client-side JS by default (like Astro).

- Single-pass performant
  [markdown-to-lit-html transformer](https://github.com/maxpatiiuk/max.patii.uk/blob/main/packages/static-site-forge/src/markdown/markdownToLitHtml.ts).

- To keep architecture simple and type-safe, the frontmatter for all pages is
  colocated in a
  [single .ts file](https://github.com/maxpatiiuk/max.patii.uk/blob/main/packages/portfolio/src/pages/projects/projectsCollection.ts#L26).

- I wish to avoid creating yet another domain-specific language (like `.astro`).
  Reusing existing `.md` and `.ts` formats provides excellent tooling support.
  Inside `.md` I can embed simple JavaScript logic using JS code-fence blocks.

- Similarly, there are no custom CLIs - the static site generator is just a
  `useForge()` Vite plugin, ensuring it is composable with Vitest, Storybook,
  and other ecosystem tools.

- Unified SSR and client build using
  [Vite's Environment API](https://vite.dev/guide/api-environment).

[Source code](https://github.com/maxpatiiuk/max.patii.uk/tree/main/packages/static-site-forge)

## AI Agents Experiment

Also, I wished to try out leading AI Agents (Copilot, Claude, Gemini) to compare
their performance and get experience with context engineering. They did fairly
well on monorepo boilerplate, pnpm, and adding fuzz tests to the markdown
transformer, but implementing the transformer itself or the Vite plugin was too
complex for even the smartest model, even after minutes of planning and
research.

See also [AI-generated code lacks common sense](../articles/ai-code-2026.md).

## Lessons learned

Astro's collection concept is useful - a home page can get metadata for all
posts in a lazy way.

It also makes sense that they decided to keep page metadata in the frontmatter
rather than separate files - colocation of such coupled data makes sense, even
if it means losing TypeScript checking.

Shadow Root is awesome for libraries and web components - styles encapsulation
and slots are useful. But for apps, it is sometimes counter-productive - I need
to globally apply the styles, especially the CSS reset, and since the styles are
inlined in the shadow root by Lit SSR rather than being separate network
requests, they aren't cached by the browser, so need to stay small and specific
to each page.

Separating the code into three separate packages adds a bit of boilerplate code
and architectural constraints. But I liked the idea of having three clean
packages: standards-compliant SSR-friendly web components, a static site
generator, and a package that brings both together by providing the content.
While a small amount of type duplication was required, the web components
package and static site generator don't depend on each other, keeping the
architecture clean.

## Technologies used

- JavaScript
- TypeScript
- Vite
- Vitest
- Lit
- Lit SSR

---

See also the [previous version of the portfolio](./portfolio.md) from 2021,
powered by Next.js.
