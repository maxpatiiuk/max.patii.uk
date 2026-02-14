import type { Collection } from '@maxpatiiuk/static-site-forge';

import { siteConfig } from '../config.js';
import { htmlDocument } from './document.js';

export function renderHomePage(collections: readonly Collection[]): string {
  const projects = collections.find((c) => c.name === 'projects');

  const projectLinks = (projects?.items ?? [])
    .map(
      (item) => `
        <article>
          <a href="/projects/${item.metadata.slug}/">
            <h3>${item.metadata.title}</h3>
          </a>
          <p class="project-description">${item.metadata.description}</p>
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
