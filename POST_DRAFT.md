Minimalistic portfolio. Also lightweight - 0 client-side JS.

But, complex implementation. I was recently learning Astro, and to help me
understand it deeper, I wished to implement an Astro clone.

Also, I wished to try out leading AI Agents (Copilot, Claude, Gemini) to compare
their performance and get experience with context engineering.

Static Site Forge's features:

- 0 client-side JS by default (like Astro)

- Type-safe frontmatter. Stored in a single file for faster dev server (home
  page can get list of posts and their titles without having to read each post's
  body).

- No special `.astro` format (it requires each tooling to support it). Instead,
  using `.md`, with an optional js code block at the top

Lessons learned:

Astro's collection concept is useful - a home page can get page meta in a lazy

also, why the meta stays defined close to the content.

Separating the UI web components and content into separate packages adds a bit
of boilerplate code overhead. But I like the idea of having 3 clean packages:
standards compliant SSR-friendly web components, a static site generator, and a
package that brings both together by providing the content. While small type
duplication was required, the web components package and static site generator
don't depend on each other.
