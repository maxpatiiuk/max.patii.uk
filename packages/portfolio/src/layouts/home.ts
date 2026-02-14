import type { PageData } from '@maxpatiiuk/static-site-forge';

import { siteConfig } from '../config.js';
import { projectOrder } from '../project-order.js';
import { htmlDocument } from './document.js';

export function renderHomePage(pages: readonly PageData[]): string {
  // Sort pages by the defined project order
  const pagesBySlug = new Map(
    pages.map((page) => [page.frontmatter.slug, page]),
  );

  const orderedPages = projectOrder
    .map((slug) => pagesBySlug.get(slug))
    .filter(
      (page): page is PageData => page?.frontmatter.description !== undefined,
    );

  const projectLinks = orderedPages
    .map(
      (page) => `
        <article>
          <a href="/projects/${page.frontmatter.slug}/">
            <h3>${page.frontmatter.title}</h3>
          </a>
          <p class="project-description">${page.frontmatter.description}</p>
        </article>`,
    )
    .join('\n');

  const navLinks = siteConfig.links
    .map(
      ({ label, url }) =>
        `<li><a href="${url}" rel="noopener">${label}</a></li>`,
    )
    .join('\n');

  const body = `
  <div class="home-layout">
    <header>
      <div class="home-header-inner">
        <hgroup>
          <h1>${siteConfig.title}</h1>
          <p class="author-title">${siteConfig.authorTitle}</p>
        </hgroup>
        <nav>
          <ul>
            ${navLinks}
          </ul>
        </nav>
      </div>
    </header>
    <main>
      <h2>My projects</h2>
      ${projectLinks}
    </main>
  </div>`;

  return htmlDocument({
    title: siteConfig.title,
    body,
  });
}
