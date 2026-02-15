import { markdownToHtml } from './markdown/scanner.js';

/**
 * Transforms a Markdown file into a Lit-JS module.
 */
export function transformMarkdown(content: string): string {
  const lines = content.replace(/\r\n?/gu, '\n').split('\n');

  const imports: string[] = [];
  let bodyStartIndex = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith('import ')) {
      imports.push(lines[i]);
      bodyStartIndex = i + 1;
    } else if (line === '') {
      bodyStartIndex = i + 1;
    } else {
      break;
    }
  }

  const bodyContent = lines.slice(bodyStartIndex).join('\n');
  const html = markdownToHtml(bodyContent);

  const transformedHtml = applyComponentTransforms(html);

  return `
import { html } from 'lit';
${imports.join('\n')}

export function render(context: any) {
  return html\`
${transformedHtml}
\`;
}
`.trim();
}

/**
 * Applies Lit-specific transforms to custom element tags in HTML.
 */
function applyComponentTransforms(html: string): string {
  // 1. Transform attributes: name={expr} -> .name=${expr}
  // 2. Transform static strings: name="val" -> .name=${"val"}
  // 3. Unfold self-closing tags: <mp-foo /> -> <mp-foo></mp-foo>

  // Match custom elements: <mp-something ... > or <mp-something ... />
  const customElementRegex = /<([a-z]+-[a-z0-9-]*)([^>]*?)(\s*\/)?>/gu;

  return html.replace(
    customElementRegex,
    (
      _: string,
      tagName: string,
      attributes: string,
      selfClosing: string | undefined,
    ) => {
      let transformedAttrs = attributes;

      // name={expr} -> .name=${expr}
      transformedAttrs = transformedAttrs.replace(
        /\s([a-zA-Z0-9-]+)=\{((?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})*)\}/gu,
        ' .$1=${$2}',
      );

      // name="val" -> .name=${"val"}
      transformedAttrs = transformedAttrs.replace(
        /\s([a-zA-Z0-9-]+)="([^"]*)"/gu,
        ' .$1=${"$2"}',
      );

      if (selfClosing !== undefined || attributes.endsWith('/')) {
        const cleanAttrs = transformedAttrs.endsWith('/')
          ? transformedAttrs.slice(0, -1).trimEnd()
          : transformedAttrs;
        return `<${tagName}${cleanAttrs}></${tagName}>`;
      }
      return `<${tagName}${transformedAttrs}>`;
    },
  );
}
