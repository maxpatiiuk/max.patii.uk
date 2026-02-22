import { describe, expect, it } from 'vitest';
import { markdownToLitHtml } from './markdownToLitHtml.ts';

function never(): never {
  throw Error('This function should never be called');
}

describe(markdownToLitHtml, () => {
  describe('basics', () => {
    it('empty', () => {
      expect(markdownToLitHtml('', never)).toBe('');
    });
    it('single line', () => {
      expect(markdownToLitHtml('T', never)).toBe('<p>T</p>');
    });
    it('multi-line', () => {
      expect(markdownToLitHtml('T\no', never)).toBe('<p>T\no</p>');
    });
    it('new lines', () => {
      expect(markdownToLitHtml('Line 1\n\nLine 2', never)).toBe(
        '<p>Line 1</p><br><p>Line 2</p>',
      );
    });
  });

  describe('headings', () => {
    it('h1', () => {
      expect(markdownToLitHtml('# Heading', never)).toBe('<h1>Heading</h1>');
    });
    it('h2,p,h3', () => {
      expect(markdownToLitHtml('## H\nT\n### S', never)).toBe(
        '<h2>H</h2>\n<p>T\n</p><h3>S</h3>',
      );
    });
  });

  describe('text formatting', () => {
    it('inline', () => {
      expect(
        markdownToLitHtml('**bold** _italic_ ~~strikethrough~~', never),
      ).toBe(`<p><b>bold</b> <i>italic</i> <s>strikethrough</s></p>`);
    });
    it('nested', () => {
      expect(
        markdownToLitHtml('# **bold _italic_ ~~strikethrough~~**', never),
      ).toBe(`<h1><b>bold <i>italic</i> <s>strikethrough</s></b></h1>`);
    });
    it("backslashes don't break things", () => {
      expect(
        markdownToLitHtml(
          '\\*\\*not bold\\*\\* \\_not italic\\_ \\\\\\*\\*still not bold\\*\\*',
          never,
        ),
      ).toBe(`<p>**not bold** _not italic_ \\**still not bold**</p>`);
    });
  });

  describe('blockquotes', () => {
    it('single level', () => {
      expect(markdownToLitHtml('> Q\n> T', never)).toBe(
        '<blockquote><p>Q\nT</p></blockquote>',
      );
    });
    it('multiple levels', () => {
      expect(markdownToLitHtml('> Q\n> > NQ\n> 1\nNo', never)).toBe(
        '<blockquote><p>Q\n</p><blockquote><p>NQ\n</p></blockquote><p>1\n</p></blockquote><p>No</p>',
      );
    });
  });

  describe('code span', () => {
    it('single backticks', () => {
      expect(markdownToLitHtml('`c` A', never)).toBe('<p><code>c</code> A</p>');
    });
    it('with markdown inside', () => {
      expect(markdownToLitHtml('`\n# Heading\n**bold**<a>&<b>\n`', never)).toBe(
        '<p><code>\n# Heading\n**bold**&lt;a&gt;&amp;&lt;b&gt;\n</code></p>',
      );
    });
    it('multiple backticks', () => {
      expect(markdownToLitHtml('``Ab `code` ac``', never)).toBe(
        '<p><code>Ab \\`code\\` ac</code></p>',
      );
    });
  });

  describe('code blocks', () => {
    it('with language', () => {
      expect(markdownToLitHtml('```\nCode block\n```', never)).toBe(
        '<pre><code>\nCode block\n</code></pre>',
      );
    });
    it('with language and backticks', () => {
      expect(markdownToLitHtml('```\nCode with `backticks`\n```', never)).toBe(
        '<pre><code>\nCode with \\`backticks\\`\n</code></pre>',
      );
    });
    it('with backticks inside blockquote', () => {
      expect(
        markdownToLitHtml('> B\n> ```\n> Code with `backticks`\n> ```', never),
      ).toBe(
        '<blockquote><p>B\n</p><pre><code>\nCode with \\`backticks\\`\n</code></pre></blockquote>',
      );
    });
    it('with markdown inside', () => {
      expect(
        markdownToLitHtml('```\n# Heading\n**bold**<a>&<b>\n```', never),
      ).toBe(
        '<pre><code>\n# Heading\n**bold**&lt;a&gt;&amp;&lt;b&gt;\n</code></pre>',
      );
    });
  });

  describe('links and images', () => {
    it('links', () => {
      expect(markdownToLitHtml('[text](url)', never)).toBe(
        '<p><a href="url">text</a></p>',
      );
    });
    it('images', () => {
      expect(markdownToLitHtml('![alt](src)', never)).toBe(
        '<img src="src" alt="alt">',
      );
    });
  });

  describe('html', () => {
    it('comment', () => {
      expect(
        markdownToLitHtml('Text\n<!-- Comment -->\nMore text', never),
      ).toBe('<p>Text\n</p><br><p>More text</p>');
    });

    it('simple tag', () => {
      expect(markdownToLitHtml('T <b>bold</b> m', never)).toBe(
        '<p>T <b>bold</b> m</p>',
      );
    });

    it('with markdown inside', () => {
      expect(markdownToLitHtml('T <b># Heading\n**bold**</b> m', never)).toBe(
        '<p>T <b># Heading\n<b>bold</b></b> m</p>',
      );
    });

    it('with backticks inside', () => {
      expect(markdownToLitHtml('T <b>`code`</b> m', never)).toBe(
        '<p>T <b><code>code</code></b> m</p>',
      );
    });

    it('with blockquote', () => {
      expect(markdownToLitHtml('> Quote\n> <b>bold</b>', never)).toBe(
        '<blockquote><p>Quote\n<b>bold</b></p></blockquote>',
      );
    });

    it('with self-closing tags', () => {
      expect(
        markdownToLitHtml(
          'T <br> <img src="src"> <br/> <br /> <br a/> m',
          never,
        ),
      ).toBe('<p>T <br> <img src="src"> <br/> <br /> <br a/> m</p>');
    });

    it('with fake custom elements', () => {
      expect(
        markdownToLitHtml(
          'T <annotation-xml>content</annotation-xml> m',
          never,
        ),
      ).toBe('<p>T <annotation-xml>content</annotation-xml> m</p>');
    });

    it('with custom elements', () => {
      const customElements: string[] = [];
      expect(
        markdownToLitHtml(
          'T <custom-element a="b">content <cu-st></cu-st> <cu-st a></cu-st > </custom-element> m',
          (tagName) => customElements.push(tagName),
        ),
      ).toBe(
        '<p>T <custom-element a="b">content <cu-st></cu-st> <cu-st a></cu-st > </custom-element> m</p>',
      );
      expect(customElements).toEqual(['custom-element', 'cu-st', 'cu-st']);
    });
  });

  describe('lists', () => {
    it('unordered', () => {
      expect(markdownToLitHtml('- 1\n- 2\n- 3', never)).toBe(
        '<ul><li><p>1\n</p></li><li><p>2\n</p></li><li><p>3</p></li></ul>',
      );
    });
    it('ordered', () => {
      expect(markdownToLitHtml('1. 1\n2. 2\n3. 3', never)).toBe(
        '<ol><li><p>1\n</p></li><li><p>2\n</p></li><li><p>3</p></li></ol>',
      );
    });
    it('ordered starting with 99, containing paragraphs and nested unordered list', () => {
      expect(
        markdownToLitHtml(
          '99. 1\n    C\n\n    1\n\n    - N1\n    - N2\n100. 2',
          never,
        ),
      ).toBe(
        '<ol start=99><li><p>1\nC</p><br><p>1</p><br><ul><li><p>N1\n</p></li><li><p>N2\n</p></li></ul></li><li><p>2</p></li></ol>',
      );
    });
    it('with nested elements', () => {
      expect(markdownToLitHtml('- 1\n- 2\n\n  Test\n\n- 3\n1', never)).toBe(
        '<ul><li><p>1\n</p></li><li><p>2</p><br><p>Test</p><br></li><li><p>3\n</p></li></ul><p>1</p>',
      );
    });
    it('inside blockquote', () => {
      expect(
        markdownToLitHtml('> - 1\n> - 2\n>\n>   > Test\n>\n> - 3\n> 1', never),
      ).toBe(
        '<blockquote><ul><li><p>1\n</p></li><li><p>2\n</p><br><blockquote><p>Test\n</p></blockquote><br></li><li><p>3\n</p></li></ul><p>1</p></blockquote>',
      );
    });
    it('with nested list', () => {
      expect(markdownToLitHtml('- 1\n- 2\n  - N1\n  - N2\n- 3', never)).toBe(
        '<ul><li><p>1\n</p></li><li><p>2\n</p><ul><li><p>N1\n</p></li><li><p>N2\n</p></li></ul></li><li><p>3</p></li></ul>',
      );
    });
    it('with single line nested lists', () => {
      expect(markdownToLitHtml('> 1. > 2. a\n> > 3', never)).toBe(
        '<blockquote><ol><li><blockquote><ol start=2><li><p>a\n</p></li></ol></blockquote></li></ol><blockquote><p>3</p></blockquote></blockquote>',
      );
    });
    it('nested ordered and unordered', () => {
      expect(
        markdownToLitHtml('- 1\n- 2\n  1. N1\n  2. N2\n     - 3', never),
      ).toBe(
        '<ul><li><p>1\n</p></li><li><p>2\n</p><ol><li><p>N1\n</p></li><li><p>N2\n</p><ul><li><p>3</p></li></ul></li></ol></li></ul>',
      );
    });
    it('with sequenced lists', () => {
      expect(markdownToLitHtml('1. 1\n- 2\n- 3\n1. 4', never)).toBe(
        '<ol><li><p>1\n</p></li></ol><ul><li><p>2\n</p></li><li><p>3\n</p></li></ul><ol><li><p>4</p></li></ol>',
      );
    });
  });
});
