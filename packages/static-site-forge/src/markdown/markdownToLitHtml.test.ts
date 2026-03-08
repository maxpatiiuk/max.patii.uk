import { describe, expect, it } from 'vitest';
import {
  markdownToLitHtml,
  type MarkdownToLitHtmlOptions,
} from './markdownToLitHtml.ts';

function never(): never {
  throw Error('This function should never be called');
}

const options: MarkdownToLitHtmlOptions = {
  resolveImageUrl: never,
  onWebComponentTag: never,
  isInline: false,
};

function resolveImageUrl(url: string): string {
  return url;
}

describe(markdownToLitHtml, () => {
  describe('basics', () => {
    it('empty', () => {
      expect(markdownToLitHtml('', options)).toBe('');
    });
    it('single line', () => {
      expect(markdownToLitHtml('T', options)).toBe('<p>T</p>');
    });
    it('multi-line', () => {
      expect(markdownToLitHtml('T\no', options)).toBe('<p>T\no</p>');
    });
    it('new lines', () => {
      expect(markdownToLitHtml('Line 1\n\nLine 2', options)).toBe(
        '<p>Line 1</p><br><p>Line 2</p>',
      );
    });
    it('three paragraphs', () => {
      expect(markdownToLitHtml('A\n\nB\n\nC', options)).toBe(
        '<p>A</p><br><p>B</p><br><p>C</p>',
      );
    });
    it('trailing newline', () => {
      expect(markdownToLitHtml('Text\n', options)).toBe('<p>Text\n</p>');
    });
    it('single character paragraph', () => {
      expect(markdownToLitHtml('A', options)).toBe('<p>A</p>');
    });
  });

  describe('headings', () => {
    it('h1', () => {
      expect(markdownToLitHtml('# Heading', options)).toBe('<h1>Heading</h1>');
    });
    it('h2,p,h3', () => {
      expect(markdownToLitHtml('## H\nT\n### S', options)).toBe(
        '<h2>H</h2>\n<p>T\n</p><h3>S</h3>',
      );
    });
    it('h4 through h6', () => {
      expect(markdownToLitHtml('#### H4', options)).toBe('<h4>H4</h4>');
      expect(markdownToLitHtml('##### H5', options)).toBe('<h5>H5</h5>');
      expect(markdownToLitHtml('###### H6', options)).toBe('<h6>H6</h6>');
    });
    it('heading with inline formatting', () => {
      expect(markdownToLitHtml('## **bold** and _italic_', options)).toBe(
        '<h2><b>bold</b> and <i>italic</i></h2>',
      );
    });
    it('heading with code span', () => {
      expect(markdownToLitHtml('## The `code` heading', options)).toBe(
        '<h2>The <code>code</code> heading</h2>',
      );
    });
    it('heading with link', () => {
      expect(markdownToLitHtml('## [link](url) heading', options)).toBe(
        '<h2><a href="url">link</a> heading</h2>',
      );
    });
    it('consecutive headings', () => {
      expect(markdownToLitHtml('# H1\n## H2\n### H3', options)).toBe(
        '<h1>H1</h1>\n<h2>H2</h2>\n<h3>H3</h3>',
      );
    });
    it('heading after paragraph', () => {
      expect(markdownToLitHtml('Text\n# Heading', options)).toBe(
        '<p>Text\n</p><h1>Heading</h1>',
      );
    });
  });

  describe('text formatting', () => {
    it('inline', () => {
      expect(
        markdownToLitHtml('**bold** _italic_ ~~strikethrough~~', options),
      ).toBe(`<p><b>bold</b> <i>italic</i> <s>strikethrough</s></p>`);
    });
    it('nested', () => {
      expect(
        markdownToLitHtml('# **bold _italic_ ~~strikethrough~~**', options),
      ).toBe(`<h1><b>bold <i>italic</i> <s>strikethrough</s></b></h1>`);
    });
    it("backslashes don't break things", () => {
      expect(
        markdownToLitHtml(
          '\\*\\*not bold\\*\\* \\_not italic\\_ \\\\\\*\\*still not bold\\*\\*',
          options,
        ),
      ).toBe(`<p>**not bold** _not italic_ \\**still not bold**</p>`);
    });
    it('bold and italic combined', () => {
      expect(markdownToLitHtml('**_bold italic_**', options)).toBe(
        '<p><b><i>bold italic</i></b></p>',
      );
    });
    it('italic and bold combined', () => {
      expect(markdownToLitHtml('_**bold italic**_', options)).toBe(
        '<p><i><b>bold italic</b></i></p>',
      );
    });
    it('strikethrough with bold inside', () => {
      expect(markdownToLitHtml('~~**bold** strikethrough~~', options)).toBe(
        '<p><s><b>bold</b> strikethrough</s></p>',
      );
    });
    it('formatting across soft line break', () => {
      expect(markdownToLitHtml('**bold\ncontinued**', options)).toBe(
        '<p><b>bold\ncontinued</b></p>',
      );
    });
    it('adjacent formatted spans', () => {
      expect(markdownToLitHtml('**bold**_italic_', options)).toBe(
        '<p><b>bold</b><i>italic</i></p>',
      );
    });
    it('escaped backslash before formatting', () => {
      expect(markdownToLitHtml('\\\\**bold**', options)).toBe(
        '<p>\\<b>bold</b></p>',
      );
    });
  });

  describe('code span', () => {
    it('single backticks', () => {
      expect(markdownToLitHtml('`c` A', options)).toBe(
        '<p><code>c</code> A</p>',
      );
    });
    it('with markdown inside', () => {
      expect(
        markdownToLitHtml('`\n# Heading\n**bold**<a>&<b>\n`', options),
      ).toBe(
        '<p><code>\n# Heading\n**bold**&lt;a&gt;&amp;&lt;b&gt;\n</code></p>',
      );
    });
    it('multiple backticks', () => {
      expect(markdownToLitHtml('``Ab `code` ac``', options)).toBe(
        '<p><code>Ab \\`code\\` ac</code></p>',
      );
    });
    it('code span with backtick level 3 inline', () => {
      expect(markdownToLitHtml('T ```code``` T', options)).toBe(
        '<p>T <code>code</code> T</p>',
      );
    });
    it('empty code span', () => {
      expect(markdownToLitHtml('`` ``', options)).toBe('<p><code> </code></p>');
    });
    it('code span preserves spaces', () => {
      expect(markdownToLitHtml('`  spaced  `', options)).toBe(
        '<p><code>  spaced  </code></p>',
      );
    });
  });

  describe('code blocks', () => {
    it('with language', () => {
      expect(markdownToLitHtml('```\nCode block\n```', options)).toBe(
        '<pre><code>\nCode block\n</code></pre>',
      );
    });
    it('with language and backticks', () => {
      expect(
        markdownToLitHtml('```\nCode with `backticks`\n```', options),
      ).toBe('<pre><code>\nCode with \\`backticks\\`\n</code></pre>');
    });
    it('with backticks inside blockquote', () => {
      expect(
        markdownToLitHtml(
          '> B\n> ```\n> Code with `backticks`\n> ```',
          options,
        ),
      ).toBe(
        '<blockquote><p>B\n</p><pre><code>\nCode with \\`backticks\\`\n</code></pre></blockquote>',
      );
    });
    it('with markdown inside', () => {
      expect(
        markdownToLitHtml('```\n# Heading\n**bold**<a>&<b>\n```', options),
      ).toBe(
        '<pre><code>\n# Heading\n**bold**&lt;a&gt;&amp;&lt;b&gt;\n</code></pre>',
      );
    });
    it('with language identifier', () => {
      expect(markdownToLitHtml('```js\nconst x = 1;\n```', options)).toBe(
        '<pre><code>\nconst x = 1;\n</code></pre>',
      );
    });
    it('empty code block', () => {
      expect(markdownToLitHtml('```\n```', options)).toBe(
        '<pre><code>\n</code></pre>',
      );
    });
    it('code block with multiple blank lines', () => {
      expect(markdownToLitHtml('```\nA\n\nB\n```', options)).toBe(
        '<pre><code>\nA\n\nB\n</code></pre>',
      );
    });
    it('code block preserves indentation', () => {
      expect(markdownToLitHtml('```\n  indented\n    more\n```', options)).toBe(
        '<pre><code>\n  indented\n    more\n</code></pre>',
      );
    });
    it('code block after paragraph', () => {
      expect(markdownToLitHtml('Text\n\n```\ncode\n```', options)).toBe(
        '<p>Text</p><br><pre><code>\ncode\n</code></pre>',
      );
    });
    it('paragraph after code block', () => {
      expect(markdownToLitHtml('```\ncode\n```\nText', options)).toBe(
        '<pre><code>\ncode\n</code></pre><br><p>Text</p>',
      );
    });
    it('code block with all html special chars', () => {
      expect(markdownToLitHtml('```\n<div>&amp;</div>\n```', options)).toBe(
        '<pre><code>\n&lt;div&gt;&amp;amp;&lt;/div&gt;\n</code></pre>',
      );
    });
  });

  describe('links and images', () => {
    it('multiple links in one line', () => {
      expect(markdownToLitHtml('[a](u1) and [b](u2)', options)).toBe(
        '<p><a href="u1">a</a> and <a href="u2">b</a></p>',
      );
    });
    it('link at end of paragraph', () => {
      expect(markdownToLitHtml('See [link](url)', options)).toBe(
        '<p>See <a href="url">link</a></p>',
      );
    });
    it('link at start of paragraph', () => {
      expect(markdownToLitHtml('[link](url) text', options)).toBe(
        '<p><a href="url">link</a> text</p>',
      );
    });
    it('link with complex URL', () => {
      expect(
        markdownToLitHtml(
          '[text](https://example.com/path?q=1&r=2#hash)',
          options,
        ),
      ).toBe(
        '<p><a href="https://example.com/path?q=1&amp;r=2#hash">text</a></p>',
      );
    });
    it('images', () => {
      expect(
        markdownToLitHtml('![alt](src)', { ...options, resolveImageUrl }),
      ).toBe(
        '<figure><div><img src="src" alt=""><figcaption>alt</figcaption></div></figure>',
      );
    });
    it('image between paragraphs', () => {
      expect(
        markdownToLitHtml('Before\n\n![alt](src)\n\nAfter', {
          ...options,
          resolveImageUrl,
        }),
      ).toBe(
        '<p>Before</p><br><figure><div><img src="src" alt=""><figcaption>alt</figcaption></div></figure><br><p>After</p>',
      );
    });
    it('image with complex alt text', () => {
      expect(
        markdownToLitHtml('![a screenshot of app](img.png)', {
          ...options,
          resolveImageUrl,
        }),
      ).toBe(
        '<figure><div><img src="img.png" alt=""><figcaption>a screenshot of app</figcaption></div></figure>',
      );
    });
    it('link with quotes in URL', () => {
      expect(markdownToLitHtml('[text](url?a="b")', options)).toBe(
        '<p><a href="url?a=&quot;b&quot;">text</a></p>',
      );
    });
    it('link with ampersand in URL', () => {
      expect(markdownToLitHtml('[text](url?a=1&b=2)', options)).toBe(
        '<p><a href="url?a=1&amp;b=2">text</a></p>',
      );
    });
    it('image with quotes in alt text', () => {
      expect(
        markdownToLitHtml('![a "quoted" alt](img.png)', {
          ...options,
          resolveImageUrl,
        }),
      ).toBe(
        '<figure><div><img src="img.png" alt=""><figcaption>a &quot;quoted&quot; alt</figcaption></div></figure>',
      );
    });
    it('image with ampersand in alt and URL', () => {
      expect(
        markdownToLitHtml('![A & B](img?a=1&b=2)', {
          ...options,
          resolveImageUrl,
        }),
      ).toBe(
        '<figure><div><img src="img?a=1&amp;b=2" alt=""><figcaption>A &amp; B</figcaption></div></figure>',
      );
    });
    it('formatted text inside link', () => {
      expect(markdownToLitHtml('[**bold** and _italic_](url)', options)).toBe(
        '<p><a href="url"><b>bold</b> and <i>italic</i></a></p>',
      );
    });
    it('image inside link', () => {
      expect(
        markdownToLitHtml('[![alt](src)](url)', {
          ...options,
          resolveImageUrl,
        }),
      ).toBe(
        '<p><a href="url"><figure><div><img src="src" alt=""><figcaption>alt</figcaption></div></figure></a></p>',
      );
    });
  });

  describe('html', () => {
    it('comment', () => {
      expect(
        markdownToLitHtml('Text\n<!-- Comment -->\nMore text', options),
      ).toBe('<p>Text\n</p><br><p>More text</p>');
    });
    it('html comment between headings', () => {
      expect(markdownToLitHtml('# H1\n<!-- comment -->\n## H2', options)).toBe(
        '<h1>H1</h1>\n<br><h2>H2</h2>',
      );
    });
    it('simple tag', () => {
      expect(markdownToLitHtml('T <b>bold</b> m', options)).toBe(
        '<p>T <b>bold</b> m</p>',
      );
    });
    it('with markdown inside', () => {
      expect(markdownToLitHtml('T <b># Heading\n**bold**</b> m', options)).toBe(
        '<p>T <b># Heading\n<b>bold</b></b> m</p>',
      );
    });
    it('with backticks inside', () => {
      expect(markdownToLitHtml('T <b>`code`</b> m', options)).toBe(
        '<p>T <b><code>code</code></b> m</p>',
      );
    });
    it('with blockquote', () => {
      expect(markdownToLitHtml('> Quote\n> <b>bold</b>', options)).toBe(
        '<blockquote><p>Quote\n<b>bold</b></p></blockquote>',
      );
    });
    it('with self-closing tags', () => {
      expect(
        markdownToLitHtml(
          'T <br> <img src="src"> <br/> <br /> <br a/> m',
          options,
        ),
      ).toBe('<p>T <br> <img src="src"> <br/> <br /> <br a/> m</p>');
    });
    it('with fake custom elements', () => {
      expect(
        markdownToLitHtml(
          'T <annotation-xml>content</annotation-xml> m',
          options,
        ),
      ).toBe('<p>T <annotation-xml>content</annotation-xml> m</p>');
    });
    it('with custom elements', () => {
      const customElements: string[] = [];
      expect(
        markdownToLitHtml(
          'T <custom-element a="b">content <cu-st></cu-st> <cu-st a></cu-st > </custom-element> m',
          {
            ...options,
            onWebComponentTag: (tagName) => customElements.push(tagName),
          },
        ),
      ).toBe(
        '<p>T <custom-element a="b">content <cu-st></cu-st> <cu-st a></cu-st > </custom-element> m</p>',
      );
      expect(customElements).toEqual(['custom-element', 'cu-st', 'cu-st']);
    });
    it('void elements', () => {
      expect(markdownToLitHtml('A <hr> B', options)).toBe('<p>A <hr> B</p>');
    });
    it('html with attributes', () => {
      expect(
        markdownToLitHtml('T <a href="url" class="link">text</a> m', options),
      ).toBe('<p>T <a href="url" class="link">text</a> m</p>');
    });
    it('with youtube embed', () => {
      const customElements: string[] = [];
      expect(
        markdownToLitHtml(
          `<mp-youtube video="hw_rM4e12UY" caption="Recording of a webinar on user preferences in Specify&nbsp;7">
<span slot="description">Showcase of User Preferences in Specify&nbsp;7</span>
</mp-youtube>`,
          {
            ...options,
            onWebComponentTag: (tagName) => customElements.push(tagName),
          },
        ),
      ).toBe(
        `<mp-youtube video="hw_rM4e12UY" caption="Recording of a webinar on user preferences in Specify&nbsp;7"><br><span slot="description">Showcase of User Preferences in Specify&nbsp;7</span>
</mp-youtube>`,
      );
    });
  });

  describe('blockquotes', () => {
    it('single level', () => {
      expect(markdownToLitHtml('> Q\n> T', options)).toBe(
        '<blockquote><p>Q\nT</p></blockquote>',
      );
    });
    it('multiple levels', () => {
      expect(markdownToLitHtml('> Q\n> > NQ\n> 1\nNo', options)).toBe(
        '<blockquote><p>Q\n</p><blockquote><p>NQ\n</p></blockquote><p>1\n</p></blockquote><p>No</p>',
      );
    });
    it('blockquote with heading', () => {
      expect(markdownToLitHtml('> # Heading', options)).toBe(
        '<blockquote><h1>Heading</h1></blockquote>',
      );
    });
    it('blockquote with formatting', () => {
      expect(markdownToLitHtml('> **bold** and _italic_', options)).toBe(
        '<blockquote><p><b>bold</b> and <i>italic</i></p></blockquote>',
      );
    });
    it('blockquote with code span', () => {
      expect(markdownToLitHtml('> `code` text', options)).toBe(
        '<blockquote><p><code>code</code> text</p></blockquote>',
      );
    });
    it('blockquote with link', () => {
      expect(markdownToLitHtml('> [text](url)', options)).toBe(
        '<blockquote><p><a href="url">text</a></p></blockquote>',
      );
    });
    it('blockquote followed by paragraph', () => {
      expect(markdownToLitHtml('> Quote\nAfter', options)).toBe(
        '<blockquote><p>Quote\n</p></blockquote><p>After</p>',
      );
    });
    it('paragraph then blockquote', () => {
      expect(markdownToLitHtml('Before\n> Quote', options)).toBe(
        '<p>Before\n</p><blockquote><p>Quote</p></blockquote>',
      );
    });
  });

  describe('lists', () => {
    it('unordered', () => {
      expect(markdownToLitHtml('- 1\n- 2\n- 3', options)).toBe(
        '<ul><li><p>1\n</p></li><li><p>2\n</p></li><li><p>3</p></li></ul>',
      );
    });
    it('ordered', () => {
      expect(markdownToLitHtml('1. 1\n2. 2\n3. 3', options)).toBe(
        '<ol><li><p>1\n</p></li><li><p>2\n</p></li><li><p>3</p></li></ol>',
      );
    });
    it('ordered starting with 99, containing paragraphs and nested unordered list', () => {
      expect(
        markdownToLitHtml(
          '99. 1\n    C\n\n    1\n\n    - N1\n    - N2\n100. 2',
          options,
        ),
      ).toBe(
        '<ol start=99><li><p>1\nC</p><br><p>1</p><br><ul><li><p>N1\n</p></li><li><p>N2\n</p></li></ul></li><li><p>2</p></li></ol>',
      );
    });
    it('with nested elements', () => {
      expect(markdownToLitHtml('- 1\n- 2\n\n  Test\n\n- 3\n1', options)).toBe(
        '<ul><li><p>1\n</p></li><li><p>2</p><br><p>Test</p><br></li><li><p>3\n</p></li></ul><p>1</p>',
      );
    });
    it('inside blockquote', () => {
      expect(
        markdownToLitHtml(
          '> - 1\n> - 2\n>\n>   > Test\n>\n> - 3\n> 1',
          options,
        ),
      ).toBe(
        '<blockquote><ul><li><p>1\n</p></li><li><p>2\n</p><br><blockquote><p>Test\n</p></blockquote><br></li><li><p>3\n</p></li></ul><p>1</p></blockquote>',
      );
    });
    it('with nested list', () => {
      expect(markdownToLitHtml('- 1\n- 2\n  - N1\n  - N2\n- 3', options)).toBe(
        '<ul><li><p>1\n</p></li><li><p>2\n</p><ul><li><p>N1\n</p></li><li><p>N2\n</p></li></ul></li><li><p>3</p></li></ul>',
      );
    });
    it('with single line nested lists', () => {
      expect(markdownToLitHtml('> 1. > 2. a\n> > 3', options)).toBe(
        '<blockquote><ol><li><blockquote><ol start=2><li><p>a\n</p></li></ol></blockquote></li></ol><blockquote><p>3</p></blockquote></blockquote>',
      );
    });
    it('nested ordered and unordered', () => {
      expect(
        markdownToLitHtml('- 1\n- 2\n  1. N1\n  2. N2\n     - 3', options),
      ).toBe(
        '<ul><li><p>1\n</p></li><li><p>2\n</p><ol><li><p>N1\n</p></li><li><p>N2\n</p><ul><li><p>3</p></li></ul></li></ol></li></ul>',
      );
    });
    it('with sequenced lists', () => {
      expect(markdownToLitHtml('1. 1\n- 2\n- 3\n1. 4', options)).toBe(
        '<ol><li><p>1\n</p></li></ol><ul><li><p>2\n</p></li><li><p>3\n</p></li></ul><ol><li><p>4</p></li></ol>',
      );
    });
    it('single item unordered list', () => {
      expect(markdownToLitHtml('- Only item', options)).toBe(
        '<ul><li><p>Only item</p></li></ul>',
      );
    });
    it('single item ordered list', () => {
      expect(markdownToLitHtml('1. Only item', options)).toBe(
        '<ol><li><p>Only item</p></li></ol>',
      );
    });
    it('list with formatted text', () => {
      expect(
        markdownToLitHtml('- **bold** item\n- _italic_ item', options),
      ).toBe(
        '<ul><li><p><b>bold</b> item\n</p></li><li><p><i>italic</i> item</p></li></ul>',
      );
    });
    it('list with code span', () => {
      expect(markdownToLitHtml('- `code` item\n- normal', options)).toBe(
        '<ul><li><p><code>code</code> item\n</p></li><li><p>normal</p></li></ul>',
      );
    });
    it('list with link', () => {
      expect(markdownToLitHtml('- [text](url)\n- item', options)).toBe(
        '<ul><li><p><a href="url">text</a>\n</p></li><li><p>item</p></li></ul>',
      );
    });
    it('paragraph before list', () => {
      expect(markdownToLitHtml('Text\n- A\n- B', options)).toBe(
        '<p>Text\n</p><ul><li><p>A\n</p></li><li><p>B</p></li></ul>',
      );
    });
    it('paragraph after list', () => {
      expect(markdownToLitHtml('- A\n- B\nText', options)).toBe(
        '<ul><li><p>A\n</p></li><li><p>B\n</p></li></ul><p>Text</p>',
      );
    });
    it('list with heading after', () => {
      expect(markdownToLitHtml('- A\n# Heading', options)).toBe(
        '<ul><li><p>A\n</p></li></ul><h1>Heading</h1>',
      );
    });
    it('deeply nested unordered lists', () => {
      expect(markdownToLitHtml('- A\n  - B\n    - C', options)).toBe(
        '<ul><li><p>A\n</p><ul><li><p>B\n</p><ul><li><p>C</p></li></ul></li></ul></li></ul>',
      );
    });
  });

  describe('combined features', () => {
    it('heading then list then paragraph', () => {
      expect(markdownToLitHtml('# Title\n- A\n- B\nEnd', options)).toBe(
        '<h1>Title</h1>\n<ul><li><p>A\n</p></li><li><p>B\n</p></li></ul><p>End</p>',
      );
    });
    it('blockquote then list', () => {
      expect(markdownToLitHtml('> Quote\n- Item', options)).toBe(
        '<blockquote><p>Quote\n</p></blockquote><ul><li><p>Item</p></li></ul>',
      );
    });
    it('list then blockquote', () => {
      expect(markdownToLitHtml('- Item\n> Quote', options)).toBe(
        '<ul><li><p>Item\n</p></li></ul><blockquote><p>Quote</p></blockquote>',
      );
    });
    it('code block then heading', () => {
      expect(markdownToLitHtml('```\ncode\n```\n# Heading', options)).toBe(
        '<pre><code>\ncode\n</code></pre><br><h1>Heading</h1>',
      );
    });
    it('image then paragraph', () => {
      expect(
        markdownToLitHtml('![alt](src)\nText', { ...options, resolveImageUrl }),
      ).toBe(
        '<figure><div><img src="src" alt=""><figcaption>alt</figcaption></div></figure>\n<p>Text</p>',
      );
    });
    it('formatting in list inside blockquote', () => {
      expect(markdownToLitHtml('> - **bold**\n> - _italic_', options)).toBe(
        '<blockquote><ul><li><p><b>bold</b>\n</p></li><li><p><i>italic</i></p></li></ul></blockquote>',
      );
    });
  });
});
