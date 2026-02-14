/**
 * Markdown-to-HTML scanner using a while-loop state machine.
 *
 * This scanner supports headings, paragraphs, lists (including nesting),
 * links, images, bold/italic/code spans, and HTML passthrough blocks.
 */
type ListNode = {
  ordered: boolean;
  items: ListItem[];
};

type ListItem = {
  text: string;
  children?: ListNode;
};

type Block =
  | { type: 'heading'; level: 1 | 2 | 3; text: string }
  | { type: 'html'; html: string }
  | { type: 'image'; alt: string; src: string }
  | { type: 'list'; list: ListNode; caption?: string }
  | { type: 'paragraph'; text: string };

type ListLine = {
  indent: number;
  ordered: boolean;
  text: string;
};

const htmlBlockStartRegex = /^\s*<([a-zA-Z0-9-]+)/u;
const listItemRegex = /^(\s*)([-*+]|\d+\.)\s+(.*)$/u;
const imageRegex = /^!\[([^\]]*)\]\(([^)]+)\)$/u;
const headingRegex = /^(#{1,3})\s+(.*)$/u;

function inlineToHtml(text: string): string {
  let output = text;

  output = output.replace(/`([^`]+)`/gu, '<code>$1</code>');
  output = output.replace(/\*\*([^*]+)\*\*/gu, '<strong>$1</strong>');
  output = output.replace(/\*([^*]+)\*/gu, '<em>$1</em>');
  output = output.replace(
    /\[([^\]]+)\]\(([^)]+)\)/gu,
    '<mp-link href="$2">$1</mp-link>',
  );

  return output;
}

function buildListTree(lines: ListLine[]): ListNode {
  const root: ListNode = {
    ordered: lines[0]?.ordered ?? false,
    items: [],
  };

  const stack: { indent: number; node: ListNode }[] = [
    { indent: lines[0]?.indent ?? 0, node: root },
  ];
  let previousItem: ListItem | undefined;

  for (const line of lines) {
    while (stack.length > 1 && line.indent < stack[stack.length - 1].indent) {
      stack.pop();
    }

    if (line.indent > stack[stack.length - 1].indent) {
      const child: ListNode = { ordered: line.ordered, items: [] };
      if (previousItem) {
        previousItem.children = child;
        stack.push({ indent: line.indent, node: child });
      }
    }

    const currentNode = stack[stack.length - 1].node;
    const item: ListItem = { text: line.text };
    currentNode.items.push(item);
    previousItem = item;
  }

  return root;
}

function renderList(list: ListNode, caption?: string): string {
  const typeAttr = list.ordered ? ' type="ol"' : '';
  const captionAttr = caption ? ` caption="${caption}"` : '';
  const itemsHtml = list.items
    .map((item) => {
      const childHtml = item.children ? renderList(item.children) : '';
      return `<li>${inlineToHtml(item.text)}${childHtml}</li>`;
    })
    .join('');

  return `<mp-list${typeAttr}${captionAttr}>${itemsHtml}</mp-list>`;
}

/**
 * Markdown-to-HTML scanner using a while-loop state machine.
 *
 * This scanner supports headings, paragraphs, lists (including nesting),
 * links, images, bold/italic/code spans, and HTML passthrough blocks.
 *
 * @public
 * @param input - Markdown input string.
 */
export function markdownToHtml(input: string): string {
  const normalized = input.replace(/\r\n?/gu, '\n');
  const lines = normalized.split('\n');
  const blocks: Block[] = [];

  let index = 0;
  while (index < lines.length) {
    const line = lines[index];

    if (line.trim() === '') {
      index += 1;
      continue;
    }

    const htmlMatch = line.match(htmlBlockStartRegex);
    if (htmlMatch) {
      const tagName = htmlMatch[1];
      const htmlLines = [line];

      const isSelfClosing =
        line.includes(`</${tagName}>`) || line.trim().endsWith('/>');
      if (!isSelfClosing) {
        index += 1;
        while (index < lines.length) {
          htmlLines.push(lines[index]);
          if (lines[index].includes(`</${tagName}>`)) {
            break;
          }
          index += 1;
        }
      }

      blocks.push({ type: 'html', html: htmlLines.join('\n') });
      index += 1;
      continue;
    }

    const headingMatch = line.match(headingRegex);
    if (headingMatch) {
      const level =
        headingMatch[1].length === 3 ? 3 : headingMatch[1].length === 2 ? 2 : 1;
      blocks.push({ type: 'heading', level, text: headingMatch[2].trim() });
      index += 1;
      continue;
    }

    const imageMatch = line.match(imageRegex);
    if (imageMatch) {
      blocks.push({ type: 'image', alt: imageMatch[1], src: imageMatch[2] });
      index += 1;
      continue;
    }

    const listMatch = line.match(listItemRegex);
    if (listMatch) {
      const listLines: ListLine[] = [];
      while (index < lines.length) {
        const current = lines[index];
        const match = current.match(listItemRegex);
        if (!match) {
          break;
        }

        const indent = match[1].length;
        const ordered = /\d+\./u.test(match[2]);
        listLines.push({ indent, ordered, text: match[3].trim() });
        index += 1;
      }

      const list = buildListTree(listLines);
      const previous =
        blocks.length > 0 ? blocks[blocks.length - 1] : undefined;
      let caption: string | undefined;
      if (
        previous?.type === 'paragraph' &&
        previous.text.trim().endsWith(':')
      ) {
        caption = previous.text.trim().slice(0, -1);
        blocks.pop();
      }

      blocks.push({ type: 'list', list, caption });
      continue;
    }

    const paragraphLines: string[] = [line.trim()];
    index += 1;
    while (index < lines.length) {
      const next = lines[index];
      if (next.trim() === '') {
        break;
      }
      if (
        next.match(htmlBlockStartRegex) ||
        next.match(headingRegex) ||
        next.match(imageRegex) ||
        next.match(listItemRegex)
      ) {
        break;
      }
      paragraphLines.push(next.trim());
      index += 1;
    }

    blocks.push({ type: 'paragraph', text: paragraphLines.join(' ') });
  }

  return blocks
    .map((block) => {
      switch (block.type) {
        case 'html':
          return block.html.trim();
        case 'heading':
          if (block.level === 3) {
            return `<mp-subheader>${inlineToHtml(block.text)}</mp-subheader>`;
          }
          return `<mp-header>${inlineToHtml(block.text)}</mp-header>`;
        case 'image':
          return `<mp-image src="${block.src}" alt="${block.alt}">${block.alt}</mp-image>`;
        case 'list':
          return renderList(
            block.list,
            block.caption ? inlineToHtml(block.caption) : undefined,
          );
        case 'paragraph':
          return `<mp-paragraph>${inlineToHtml(block.text)}</mp-paragraph>`;
        default:
          return '';
      }
    })
    .filter((block) => block !== '')
    .join('\n');
}
