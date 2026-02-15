import { siteConfig } from '../config.js';
import { htmlDocument } from './document.js';
import { collections } from '../collections';

export function renderHomePage(): string {
  const projects = collections.projects;

  const projectLinks = Object.entries(projects)
    .map(
      ([slug, metadata]) => `
        <article>
          <a href="/projects/${slug}/">
            <h3>${metadata.title}</h3>
          </a>
          <p class="project-description">${metadata.description ?? ''}</p>${
            metadata.gitHub !== undefined
              ? `
          <a class="github-link" href="${metadata.gitHub}">GitHub</a>`
              : ''
          }
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
