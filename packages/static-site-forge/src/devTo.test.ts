import { describe, expect, it } from 'vitest';
import { markdownToDevTo } from './devTo.ts';

const options = {
  canonicalBaseUrl: 'https://max.patii.uk/',
  sourceFilePath: `${process.cwd()}/src/pages/articles/example.md`,
};

describe(markdownToDevTo, () => {
  it('rewrites relative document links and public images', async () => {
    expect(
      (
        await markdownToDevTo(
          '[Related](./related.md#section)\n\n![Image](../../../public/articles/example/image.avif)',
          options,
        )
      ).markdown,
    ).toBe(
      '[Related](https://max.patii.uk/articles/related#section)\n\n![Image](https://max.patii.uk/articles/example/image.avif)\n',
    );
  });

  it('preserves line-break HTML and warns about web components and video', async () => {
    expect(
      await markdownToDevTo(
        'First line<br>Second line\n\n<mp-example></mp-example>\n<video src="video.mp4"></video>',
        options,
      ),
    ).toEqual({
      markdown:
        'First line<br>Second line\n\n<mp-example></mp-example> <video src="video.mp4"></video>\n',
      warnings: [
        'DEV.to does not support the web component <mp-example>; replace it manually.',
        'Review <video> manually: keep it only after verifying DEV.to renders it, or replace it with a supported embed or link.',
      ],
    });
  });

  it('rewrites escaped URLs without losing parentheses', async () => {
    expect(
      (
        await markdownToDevTo(
          '[Section](<./example#:~:text=with%20(parentheses)>)',
          options,
        )
      ).markdown,
    ).toBe(
      '[Section](<https://max.patii.uk/articles/example#:~:text=with%20(parentheses)>)\n',
    );
  });

  it('unwraps prose paragraphs', async () => {
    expect(
      (
        await markdownToDevTo(
          'One example is\n[the book](https://example.com/book).\nFor context, it is good.',
          options,
        )
      ).markdown,
    ).toBe(
      'One example is [the book](https://example.com/book). For context, it is good.\n',
    );
  });
});
