import { render as ssrRender } from '@lit-labs/ssr';
import { collectResultSync } from '@lit-labs/ssr/lib/render-result.js';
import type { BasePageMetadata, Collection, GetLayout } from './types.ts';
import { html, unsafeStatic } from 'lit/static-html.js';
import type { TemplateResult } from 'lit';

export async function renderPage(
  rootLayout: GetLayout<BasePageMetadata>,
  collection: Collection | undefined,
  page: BasePageMetadata | undefined,
  litHtml: TemplateResult | '',
): Promise<string> {
  if (collection === undefined) {
    throw Error('Collection not found');
  }
  if (page === undefined) {
    throw Error('Page not found');
  }
  const composedPage = await composeLayout(
    page.layout ?? collection.defaultLayout,
    page,
    litHtml,
  );
  debugger;
  const rootPage = await composeLayout(rootLayout, page, composedPage);
  const result = ssrRender(rootPage);
  const renderedHtml = collectResultSync(result);
  return renderedHtml.replaceAll(reLitHtmlComment, '');
}

const reLitHtmlComment = /<!--\/?lit-[^-]+-->/gu;

async function composeLayout(
  layoutModule: GetLayout<BasePageMetadata> | false,
  page: BasePageMetadata,
  litHtml: TemplateResult | '',
): Promise<TemplateResult | ''> {
  if (layoutModule === false) {
    return litHtml;
  }
  const pageModule = await layoutModule();
  const LayoutCustomElement = Object.entries(pageModule).find(([key]) =>
    key.startsWith(key[0].toUpperCase()),
  )?.[1] as CustomElementConstructor | undefined;
  if (LayoutCustomElement === undefined) {
    throw Error('Layout module does not export a custom element');
  }
  const tagName = customElements.getName(LayoutCustomElement);
  if (tagName === null) {
    throw Error('Layout module does not export a registered custom element');
  }
  const staticTagName = unsafeStatic(tagName);
  return html`<${staticTagName} .layoutData=${page}>${litHtml}</${staticTagName}>`;
}
