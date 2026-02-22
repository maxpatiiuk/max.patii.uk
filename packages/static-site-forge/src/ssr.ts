import { render } from '@lit-labs/ssr';
import { collectResult } from '@lit-labs/ssr/lib/render-result.ts';
import type { TemplateResult } from 'lit';

/**
 * Renders a Lit template to a string using Lit SSR.
 */
export async function renderToString(
  template: TemplateResult,
): Promise<string> {
  const result = render(template);
  const htmlResult = await collectResult(result);
  if (htmlResult.trimStart().startsWith('<head')) {
    return `<!DOCTYPE html><html lang="en-US">${htmlResult}</html>`;
  }
  return htmlResult;
}
