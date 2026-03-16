import { render as ssrRender } from '@lit-labs/ssr';
import { collectResultSync } from '@lit-labs/ssr/lib/render-result.js';
import type { BasePageMetadata, Collection, GetLayout } from './types.ts';
import { html, unsafeStatic } from 'lit/static-html.js';
import { nothing, type TemplateResult } from 'lit';

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
    page.children === 'slot',
  );
  const rootPage = await composeLayout(rootLayout, page, composedPage);
  const result = ssrRender(rootPage);
  const renderedHtml = collectResultSync(result);
  const cleanedHtml = renderedHtml
    .replaceAll(reLitHtmlComment, '')
    // Avoid w3 validation error
    .replaceAll(deprecatedTemplate, supportedTemplate);

  // The root layout includes DOCTYPE, html, head, and body. Those cannot appear
  // inside a web component or template, so pull them out.
  const firstTemplate = cleanedHtml.indexOf('<template');
  if (firstTemplate === -1) {
    throw Error('Rendered HTML does not contain a template');
  }
  const firstTemplateStartEnd = cleanedHtml.indexOf('>', firstTemplate);
  if (firstTemplateStartEnd === -1) {
    throw Error('Malformed template tag in rendered HTML');
  }
  const templateEnd = cleanedHtml.lastIndexOf('</template>');
  if (templateEnd === -1) {
    throw Error('Rendered HTML does not contain a closing template tag');
  }
  const joined = cleanedHtml.slice(firstTemplateStartEnd + 1, templateEnd);

  return joined;
}

const reLitHtmlComment = /<(?:\?|!--\/?lit-[^-]+--)>/gu;
const deprecatedTemplate = `<template shadowroot="open" shadowrootmode="open">`;
const supportedTemplate = `<template shadowrootmode="open">`;

async function composeLayout(
  layoutModule: GetLayout<BasePageMetadata> | false,
  page: BasePageMetadata,
  litHtml: TemplateResult | '',
  isSlot = false,
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
    throw Error(
      `Layout module does not export a registered custom element. Expected ${LayoutCustomElement.name} to be registered.`,
    );
  }
  const staticTagName = unsafeStatic(tagName);
  return html`<${staticTagName} .layoutData=${page} .slotted=${isSlot ? nothing : litHtml}>${isSlot ? litHtml : nothing}</${staticTagName}>`;
}
