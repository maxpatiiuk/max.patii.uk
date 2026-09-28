import { parse, type ParsedToken } from 'sugar-high/core';
import * as typescript from 'sugar-high/lang/typescript';

export function renderCode(content: string, language: string): string {
  const grammar = languages[language as keyof typeof languages];
  if (grammar === undefined && language !== 'text')
    throw Error(`Unsupported code highlighting language: ${language}`);

  const html =
    grammar === undefined
      ? escapeCode(content)
      : parse(content, grammar)
          .lines.map((line) => renderTokens(line.tokens))
          .join('\n');
  return `<pre><code class="language-${escapeAttribute(language)}">${html}</code></pre>`;
}

const languages = { ts: typescript } as const;
const tagKeyword = 'k-';
const tagString = 's-';
const tagComment = 'c-';
const tagNumber = 'n-';
const tagFunction = 'f-';
const tagType = 't-';
type Tag =
  | typeof tagKeyword
  | typeof tagString
  | typeof tagComment
  | typeof tagNumber
  | typeof tagFunction
  | typeof tagType
  | '';

function renderTokens(tokens: readonly ParsedToken[]): string {
  let html = '';
  let text = '';
  let tag: Tag = '';
  for (let index = 0; index < tokens.length; ++index) {
    const token = tokens[index]!;
    const nextTag = tokenToTag(token, tokens[index + 1]);
    if (nextTag !== tag) {
      html += renderToken(text, tag);
      text = '';
      tag = nextTag;
    }
    text += token.value;
  }
  return html + renderToken(text, tag);
}

function tokenToTag(token: ParsedToken, next: ParsedToken | undefined): Tag {
  switch (token.type) {
    case 'keyword':
      return tagKeyword;
    case 'string':
      return tagString;
    case 'comment':
      return tagComment;
    case 'class':
      return /^\d/.test(token.value) ? tagNumber : tagType;
    case 'entity':
      return tagNumber;
    case 'identifier':
      return next?.value === '(' ? tagFunction : '';
    default:
      return '';
  }
}

function renderToken(text: string, tag: Tag): string {
  if (text === '') return '';
  const escaped = escapeCode(text);
  return tag === '' ? escaped : `<${tag}>${escaped}</${tag}>`;
}

function escapeCode(text: string): string {
  return text.replace(/[&<>\\`]|\$\{/g, (match) => {
    switch (match) {
      case '&':
        return '&amp;';
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '\\':
        return '\\\\';
      case '`':
        return '\\`';
      default:
        return '\\${';
    }
  });
}

export function escapeAttribute(value: string): string {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;');
}
