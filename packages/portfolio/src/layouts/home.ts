import { html, type TemplateResult } from 'lit';
import type { PageMetadata, SiteConfig } from '@maxpatiiuk/static-site-forge';
import { renderShell } from './shell.js';

export function renderLayout(
  content: TemplateResult,
  metadata: PageMetadata,
  siteConfig: SiteConfig,
): TemplateResult {
  const innerContent = html` <div class="home-layout">${content}</div>`;

  return renderShell(innerContent, metadata, siteConfig);
}
