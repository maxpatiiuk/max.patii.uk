import { describe, it, expect } from 'vitest';
import { html } from 'lit';
import { renderToString } from './ssr.js';

describe('renderToString', () => {
  it('should render a simple template', async () => {
    const template = html`<div>Hello World</div>`;
    const output = await renderToString(template);
    expect(output).toContain('<div>Hello World</div>');
  });

  it('should render a template with expressions', async () => {
    const name = 'Lit';
    const template = html`<div>Hello ${name}</div>`;
    const output = await renderToString(template);
    expect(output).toContain(
      '<div>Hello <!--lit-part-->Lit<!--/lit-part--></div>',
    );
  });

  it('should render a template with nested templates', async () => {
    const inner = html`<span>Inner</span>`;
    const template = html`<div>Outer ${inner}</div>`;
    const output = await renderToString(template);
    expect(output).toContain('<div>Outer <!--lit-part');
    expect(output).toContain('<span>Inner</span>');
  });
});
