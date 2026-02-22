import type { ForgeConfig } from '../types.ts';
import { markdownToLitHtml } from './markdownToLitHtml.ts';

/**
 * Transforms a Markdown file into a Lit-JS module.
 */
export function markdownToJs(
  content: string,
  isServe: boolean,
  config: ForgeConfig,
): string {
  const hasJsPrefix = content.startsWith('```');
  const jsPrefixEnd = hasJsPrefix ? content.indexOf('\n```\n', 3) : -1;
  let webComponentImports = '';
  const prefix = hasJsPrefix
    ? content.slice(content.indexOf('\n') + 1, jsPrefixEnd + 1)
    : '';
  const bodyContent = hasJsPrefix
    ? content.slice(jsPrefixEnd + '\n```\n'.length)
    : content;
  const litHtml = markdownToLitHtml(bodyContent, (tagName) => {
    const importPath = config.getWebComponentImportPath(tagName);
    webComponentImports += `import "${importPath}";\n`;
  });

  // Wrap the module in a function rather than execute immediately
  // so that `new Date()` is fresh on each request
  const module = `${isServe ? `import "@maxpatiiuk/static-site-forge/litHmrPatch.js";` : ''}
${prefix}import { html, render as ssrRender } from "@lit-labs/ssr";
import {collectResultSync} from '@lit-labs/ssr/lib/render-result.js';

export function render() {
  const result = ssrRender(html\`${litHtml}\`);
  return collectResultSync(result);
}`;

  return module;
}
