import { throwParseError } from './throwParseError.ts';

export type MarkdownToLitHtmlOptions = {
  readonly resolveImageUrl: (url: string, alt: string) => string;
  readonly onWebComponentTag: (tagName: string) => void;
  readonly isInline: boolean;
};

/**
 * A performant markdown-to-lit-html single-pass transformer.
 *
 * This transformer supports headings, paragraphs, infinitely nested lists and blockquotes,
 * links, images, bold/italic/code spans, and HTML passthrough blocks.
 *
 * TODO: add markdown tables support and use them in proton-unlimited.md
 */
export function markdownToLitHtml(
  markdown: string,
  options: MarkdownToLitHtmlOptions,
): string {
  const { onWebComponentTag, resolveImageUrl, isInline } = options;
  const ropes: string[] = [];
  const length = markdown.length;

  let flushIndex = 0;
  let isBlockLevel = true;
  let isInParagraph = isInline;
  let hadBackslash = false;
  let isInBold = false;
  let isInItalic = false;
  let isInStrikethrough = false;
  let activeHeadingLevel = 0;
  const htmlStack: string[] = [];
  const listsStack: number[] = [];

  for (let index = progressLists(0); index < length; ++index) {
    const code = markdown.charCodeAt(index);

    switch (code) {
      case codeNewLine:
        if (isBlockLevel) {
          flushText(index - 1);
          flushParagraph();
          flushIndex = index + 1;
        } else {
          if (activeHeadingLevel > 0) {
            flushText(index);
            flushHeading();
            flushIndex = index;
          }
          isBlockLevel = true;
        }
        index = progressLists(index + 1) - 1;
        continue;
      case codeHash:
        if (isBlockLevel) {
          isBlockLevel = false;
          flushText(index);
          flushParagraph();
          while (markdown.charCodeAt(index) === codeHash) {
            ++activeHeadingLevel;
            ++index;
          }
          // Eat space after #
          flushIndex = index + 1;
          ropes.push(`<h${activeHeadingLevel}>`);
        }
        continue;
      case codeBackslash:
        if (hadBackslash) {
          hadBackslash = false;
        } else {
          maybeStartParagraph(index);
          flushText(index);
          flushIndex = index + 1;
          hadBackslash = true;
        }
        continue;
      case codeAsterisk:
        maybeStartParagraph(index);
        if (hadBackslash) {
          hadBackslash = false;
        } else if (markdown.charCodeAt(index + 1) === codeAsterisk) {
          flushText(index);
          ++index;
          flushIndex = index + 1;
          ropes.push(isInBold ? '</b>' : '<b>');
          isInBold = !isInBold;
        }
        continue;
      case codeUnderscore:
        maybeStartParagraph(index);
        if (hadBackslash) {
          hadBackslash = false;
        } else {
          flushText(index);
          flushIndex = index + 1;
          ropes.push(isInItalic ? '</i>' : '<i>');
          isInItalic = !isInItalic;
        }
        continue;
      case codeTilde:
        maybeStartParagraph(index);
        if (hadBackslash) {
          hadBackslash = false;
        } else if (markdown.charCodeAt(index + 1) === codeTilde) {
          flushText(index);
          ++index;
          flushIndex = index + 1;
          ropes.push(isInStrikethrough ? '</s>' : '<s>');
          isInStrikethrough = !isInStrikethrough;
        }
        continue;
      case codeBacktick: {
        let backtickLevel = 0;
        const startIndex = index;
        flushText(index);
        do {
          ++backtickLevel;
          ++index;
        } while (markdown.charCodeAt(index) === codeBacktick);

        const isCodeSnippet = isBlockLevel && backtickLevel >= 3;
        if (isCodeSnippet) {
          flushParagraph();
          // Eat language identifier after ```
          // We don't support color highlighting yet.
          while (index < length && markdown.charCodeAt(index) !== codeNewLine) {
            ++index;
          }
          flushIndex = index;
          ropes.push('<pre><code>');

          const indentSize =
            startIndex - (markdown.lastIndexOf('\n', startIndex) + 1);
          index = processBackticks(index, backtickLevel, indentSize);

          ropes.push('</code></pre>');
        } else {
          flushIndex = index;
          maybeStartParagraph(index);
          ropes.push(`<code>`);
          index = processBackticks(index, backtickLevel, 0);
          ropes.push(`</code>`);
        }
        continue;
      }
      case codeExclamation:
        const isImage = markdown.charCodeAt(index + 1) === codeOpenBracket;
        if (isImage) {
          flushText(index);
          flushParagraph();
          const altTextStart = index + 2;
          const altTextEnd = markdown.indexOf(']', altTextStart);
          if (altTextEnd === -1) {
            throwParseError(markdown, index, 'Unclosed alt text in image');
          }
          const altText = markdown.slice(altTextStart, altTextEnd);
          if (markdown.charCodeAt(altTextEnd + 1) !== codeOpenParen) {
            throwParseError(markdown, altTextEnd + 1, 'Missing URL in image');
          }
          const urlStart = altTextEnd + 2;
          const urlEnd = markdown.indexOf(')', urlStart);
          if (urlEnd === -1) {
            throwParseError(markdown, urlStart, 'Unclosed URL in image');
          }
          const rawUrl = markdown.slice(urlStart, urlEnd);
          const url = escapeAttribute(resolveImageUrl(rawUrl, altText));
          ropes.push(
            `<figure><div><img src="${url}" alt="" loading="lazy">${altText === '' ? '' : `<figcaption>${escapeAttribute(altText)}</figcaption>`}</div></figure>`,
          );
          index = urlEnd + 1;
          flushIndex = index;
        } else {
          maybeStartParagraph(index);
        }
        continue;
      case codeOpenBracket:
        flushText(index);
        maybeStartParagraph(index);
        const linkTextStart = index + 1;
        const isImageLink =
          markdown.charCodeAt(linkTextStart) === codeExclamation;
        const bracketEnd = markdown.indexOf(']', linkTextStart);
        const linkTextEnd =
          isImageLink && bracketEnd !== -1
            ? markdown.indexOf(']', bracketEnd + 1)
            : bracketEnd;
        if (linkTextEnd === -1) {
          throwParseError(markdown, index, 'Unclosed link text');
        }
        const linkText = markdown.slice(linkTextStart, linkTextEnd);
        if (markdown.charCodeAt(linkTextEnd + 1) !== codeOpenParen) {
          throwParseError(markdown, linkTextEnd + 1, 'Missing URL in link');
        }

        const urlStart = linkTextEnd + 2;

        const isEscapedUrl = markdown.charCodeAt(urlStart) === codeLessThan;
        let urlEnd: number;
        let urlStringEnd: number;
        let urlStringStart = urlStart;
        if (isEscapedUrl) {
          const escapeEnd = markdown.indexOf('>', urlStart + 1);
          if (escapeEnd === -1) {
            throwParseError(markdown, urlStart, 'Unclosed escaped URL in link');
          }
          if (markdown.charCodeAt(escapeEnd + 1) !== codeCloseParen) {
            throwParseError(
              markdown,
              escapeEnd + 1,
              'Expected ) after escaped URL in link',
            );
          }
          ++urlStringStart;
          urlStringEnd = escapeEnd;
          urlEnd = escapeEnd + 1;
        } else {
          urlEnd = markdown.indexOf(')', urlStart);
          urlStringEnd = urlEnd;
          if (urlEnd === -1) {
            throwParseError(markdown, urlStart, 'Unclosed URL in link');
          }
        }
        const rawUrl = markdown.slice(urlStringStart, urlStringEnd);

        const url = escapeAttribute(rawUrl);
        const renderedLinkText = markdownToLitHtml(linkText, {
          ...options,
          isInline: true,
        });
        ropes.push(`<a href="${url}">${renderedLinkText}</a>`);
        index = urlEnd;
        flushIndex = index + 1;
        continue;
      case codeLessThan:
        flushText(index);
        flushIndex = index;
        if (
          markdown.charCodeAt(index + 1) === codeExclamation &&
          markdown.charCodeAt(index + 2) === codeDash &&
          markdown.charCodeAt(index + 3) === codeDash
        ) {
          // HTML comment
          const commentEnd = markdown.indexOf('-->', index + 4);
          if (commentEnd === -1) {
            throwParseError(markdown, index, 'Unclosed HTML comment');
          }
          index = commentEnd + 2;
          flushIndex = index + 1;
        } else if (markdown.charCodeAt(index + 1) === codeSlash) {
          // Closing tag
          const tagNameStart = index + 2;
          const tagNameEnd = markdown.indexOf('>', tagNameStart);
          if (tagNameEnd === -1) {
            throwParseError(markdown, index, 'Unclosed HTML tag');
          }
          const tagName = markdown.slice(tagNameStart, tagNameEnd).trimEnd();
          if (
            htmlStack.length === 0 ||
            htmlStack[htmlStack.length - 1] !== tagName
          ) {
            throwParseError(
              markdown,
              index,
              `Mismatched closing HTML tag: </${tagName}>. Expected </${htmlStack[htmlStack.length - 1]}>`,
            );
          }
          htmlStack.pop();
          ropes.push(markdown.slice(index, tagNameEnd + 1));
          index = tagNameEnd;
          flushIndex = index + 1;
        } else {
          index = processHtmlTag(index);
        }
        continue;
      default:
        maybeStartParagraph(index);
        continue;
    }
  }

  if (isInBold || isInItalic || isInStrikethrough) {
    throwParseError(markdown, length - 1, 'Unclosed inline markdown');
  }
  if (htmlStack.length > 0) {
    throwParseError(
      markdown,
      length - 1,
      `Unclosed HTML tag: <${htmlStack[htmlStack.length - 1]}>`,
    );
  }

  flushText(length);
  flushIndex = length;
  flushHeading();
  closeLists(0);

  return ropes.join('');

  function flushText(upToIndex: number): void {
    if (flushIndex < upToIndex) {
      const text = markdown.slice(flushIndex, upToIndex);
      ropes.push(text);
    }
  }

  function flushParagraph(): void {
    if (isInParagraph) {
      isInParagraph = false;
      if (!isInline) {
        ropes.push('</p>');
      }
    }
  }

  function flushHeading(): void {
    if (activeHeadingLevel > 0) {
      ropes.push(`</h${activeHeadingLevel}>`);
      activeHeadingLevel = 0;
    }
  }

  function maybeStartParagraph(index: number): void {
    if (isBlockLevel && !isInParagraph && htmlStack.length === 0) {
      flushText(index);
      flushIndex = index;
      isInParagraph = true;
      ropes.push('<p>');
    }
    isBlockLevel = false;
  }

  function processBackticks(
    index: number,
    backtickLevel: number,
    indentSize: number,
  ): number {
    while (index < length) {
      const code = markdown.charCodeAt(index);
      switch (code) {
        case codeNewLine:
          flushText(index);
          ropes.push('\n');
          index += indentSize + 1;
          flushIndex = index;
          continue;
        case codeLessThan:
          flushText(index);
          index += 1;
          flushIndex = index;
          ropes.push('&lt;');
          continue;
        case codeGreaterThan:
          flushText(index);
          index += 1;
          flushIndex = index;
          ropes.push('&gt;');
          continue;
        case codeAmpersand:
          flushText(index);
          index += 1;
          flushIndex = index;
          ropes.push('&amp;');
          continue;
        case codeBacktick: {
          flushText(index);
          let backtickCount = 0;
          do {
            ++backtickCount;
            ++index;
          } while (markdown.charCodeAt(index) === codeBacktick);
          flushIndex = index;
          if (backtickCount >= backtickLevel) {
            return index - 1;
          } else {
            ropes.push('\\`'.repeat(backtickCount));
            continue;
          }
        }
        default:
          ++index;
          continue;
      }
    }
    throwParseError(markdown, length - 1, 'Unclosed backtick block');
  }

  function processHtmlTag(index: number): number {
    const tagNameStart = index + 1;
    let tagName: string;
    while (index < length) {
      const charCode = markdown.charCodeAt(index);
      switch (charCode) {
        case codeSpace:
          tagName = markdown.slice(tagNameStart, index);
          const bracketIndex = markdown.indexOf('>', index);
          if (bracketIndex === -1) {
            throwParseError(markdown, index, 'Unclosed HTML tag');
          }
          if (
            markdown.charCodeAt(bracketIndex - 1) !== codeSlash &&
            !voidElements.has(tagName)
          ) {
            htmlStack.push(tagName);
          }
          if (
            tagName.includes('-') &&
            !blockListedCustomElementNames.has(tagName)
          ) {
            onWebComponentTag(tagName);
          }
          index = bracketIndex;
          flushText(index + 1);
          flushIndex = index + 1;
          return index;
        case codeSlash:
          if (markdown.charCodeAt(index + 1) !== codeGreaterThan) {
            throwParseError(
              markdown,
              index,
              'Expected closing angle bracket after slash in HTML tag',
            );
          }

          tagName = markdown.slice(tagNameStart, index);
          if (
            tagName.includes('-') &&
            !blockListedCustomElementNames.has(tagName)
          ) {
            onWebComponentTag(tagName);
          }
          flushText(index + 1);
          flushIndex = index + 1;
          return index;
        case codeGreaterThan:
          tagName = markdown.slice(tagNameStart, index);
          if (!voidElements.has(tagName)) {
            htmlStack.push(tagName);
          }
          if (
            tagName.includes('-') &&
            !blockListedCustomElementNames.has(tagName)
          ) {
            onWebComponentTag(tagName);
          }
          flushText(index + 1);
          flushIndex = index + 1;
          return index;
        default:
          ++index;
          continue;
      }
    }
    throwParseError(markdown, index - 1, 'Unclosed HTML tag');
  }

  /**
   * Treating blockquotes as special single-item lists in order to reuse the
   * logic and permit arbitrary nesting of blockquotes and lists.
   */
  function progressLists(index: number): number {
    let stackIndex = 0;
    for (; index < length; ) {
      const code = markdown.charCodeAt(index);
      if (code === codeNewLine) {
        const blockquoteIndex = listsStack.indexOf(
          blockquoteMarker,
          stackIndex,
        );
        if (blockquoteIndex !== -1) {
          flushText(index);
          flushIndex = index;
          closeLists(blockquoteIndex);
        }
        return index;
      } else if (code === codeGreaterThan) {
        flushText(index);
        if (listsStack[stackIndex] === blockquoteMarker) {
          const nextChar = markdown.charCodeAt(index + 1);
          if (nextChar === codeSpace) {
            flushIndex = index + 2;
            index = flushIndex;
            ++stackIndex;
          } else if (nextChar === codeNewLine) {
            const blockquoteIndex = listsStack.indexOf(
              blockquoteMarker,
              stackIndex + 1,
            );
            if (blockquoteIndex !== -1) {
              closeLists(blockquoteIndex);
            }
            flushIndex = index + 1;
            return flushIndex;
          } else {
            throwParseError(
              markdown,
              index + 1,
              `Expected space or newline after >`,
            );
          }
        } else {
          closeLists(stackIndex);
          flushIndex = index + 2;
          index = flushIndex;
          listsStack.push(blockquoteMarker);
          ++stackIndex;
          ropes.push('<blockquote>');
        }
      } else if (code === codeDash) {
        let hrIndex = index;
        let dashCount = 0;
        while (hrIndex < length) {
          const code = markdown.charCodeAt(hrIndex);
          if (code === codeDash) {
            ++dashCount;
            ++hrIndex;
          } else if (code === codeSpace) {
            ++hrIndex;
          } else {
            break;
          }
        }
        if (
          dashCount >= 3 &&
          (hrIndex >= length || markdown.charCodeAt(hrIndex) === codeNewLine)
        ) {
          flushText(index);
          closeLists(stackIndex);
          ropes.push('<hr>');
          flushIndex = hrIndex;
          return hrIndex;
        }
        flushText(index);
        flushIndex = index + 2;
        index = flushIndex;
        if (listsStack[stackIndex] === unorderedListMarker) {
          const nextChar = markdown.charCodeAt(index - 1);
          if (nextChar === codeSpace) {
            ++stackIndex;
            closeLists(stackIndex);
            ropes.push('</li><li>');
          } else {
            throwParseError(markdown, index - 1, `Expected space after -`);
          }
        } else {
          closeLists(stackIndex);
          ++stackIndex;
          listsStack.push(unorderedListMarker);
          ropes.push('<ul><li>');
        }
      } else if (code >= codeZero && code <= codeNine) {
        let tentativeIndex = index;
        let number = 0;
        while (
          markdown.charCodeAt(tentativeIndex) >= codeZero &&
          markdown.charCodeAt(tentativeIndex) <= codeNine
        ) {
          number =
            number * 10 + (markdown.charCodeAt(tentativeIndex) - codeZero);
          ++tentativeIndex;
        }
        if (markdown.charCodeAt(tentativeIndex) === codeDot) {
          const nextChar = markdown.charCodeAt(tentativeIndex + 1);
          if (nextChar !== codeSpace) {
            throwParseError(
              markdown,
              tentativeIndex + 1,
              `Expected space after dot in ordered list marker`,
            );
          }
          flushText(index);
          flushIndex = tentativeIndex + 2;
          index = flushIndex;
          const stackItem = listsStack.at(stackIndex);
          if (
            stackItem !== undefined &&
            stackItem !== blockquoteMarker &&
            stackItem !== unorderedListMarker
          ) {
            listsStack[stackIndex] = number;
            ++stackIndex;
            closeLists(stackIndex);
            ropes.push('</li><li>');
          } else {
            closeLists(stackIndex);
            ++stackIndex;
            listsStack.push(number);
            ropes.push(number === 1 ? '<ol><li>' : `<ol start=${number}><li>`);
          }
        } else {
          break;
        }
      } else if (code === codeSpace) {
        flushText(index);
        const stackItem = listsStack.at(stackIndex);
        if (stackItem === blockquoteMarker || stackItem === undefined) {
          throwParseError(markdown, index, `Unexpected space`);
        } else {
          let spaceLength =
            stackItem === unorderedListMarker
              ? 1
              : Math.floor(Math.log10(stackItem)) + 2;
          for (++index; spaceLength > 0; --spaceLength, ++index) {
            if (markdown.charCodeAt(index) !== codeSpace) {
              throwParseError(
                markdown,
                index,
                `Expected ${spaceLength} more spaces for nested list indentation`,
              );
            }
          }
          flushIndex = index;
          ++stackIndex;
        }
      } else {
        break;
      }
    }
    if (listsStack.at(stackIndex) !== undefined) {
      flushText(index);
      flushIndex = index;
      closeLists(stackIndex);
    }
    return index;
  }
  function closeLists(listIndex: number): void {
    const listStackLength = listsStack.length;
    flushParagraph();
    for (; listIndex < listStackLength; ++listIndex) {
      const listStackItem = listsStack.pop()!;
      ropes.push(getListCloser(listStackItem));
    }
  }
  function getListCloser(listStackItem: number): string {
    return listStackItem === unorderedListMarker
      ? '</li></ul>'
      : listStackItem === blockquoteMarker
        ? '</blockquote>'
        : '</li></ol>';
  }
}

const codeNewLine = 10;
const codeSpace = 32;
const codeExclamation = 33;
const codeHash = 35;
const codeAmpersand = 38;
const codeOpenParen = 40;
const codeCloseParen = 41;
const codeAsterisk = 42;
const codeDash = 45;
const codeDot = 46;
const codeSlash = 47;
const codeLessThan = 60;
const codeGreaterThan = 62;
const codeOpenBracket = 91;
const codeBackslash = 92;
const codeUnderscore = 95;
const codeBacktick = 96;
const codeTilde = 126;
const codeZero = 48;
const codeNine = 57;
const unorderedListMarker = 0;
const blockquoteMarker = -1;

const voidElements = new Set([
  'area',
  'base',
  'br',
  'col',
  'command',
  'embed',
  'hr',
  'img',
  'input',
  'keygen',
  'link',
  'meta',
  'param',
  'source',
  'track',
  'wbr',
]);
const blockListedCustomElementNames = new Set([
  'annotation-xml',
  'color-profile',
  'font-face',
  'font-face-src',
  'font-face-uri',
  'font-face-format',
  'font-face-name',
  'missing-glyph',
]);

function escapeAttribute(value: string): string {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;');
}
