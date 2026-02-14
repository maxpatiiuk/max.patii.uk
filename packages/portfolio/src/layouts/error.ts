import { htmlDocument } from './document.js';
import { siteConfig } from '../config.js';

export function render404Page(): string {
  const body = `
  <main class="error-layout">
    <h1>Oops! Nothing was found</h1>
    <p>
      The page you are looking for might have been removed,
      had its name changed or is temporarily unavailable.
    </p>
    <a href="/">Return to homepage</a>
  </main>`;

  return htmlDocument({
    title: `404 | ${siteConfig.title}`,
    body,
  });
}
