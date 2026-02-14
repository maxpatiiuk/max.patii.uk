import { LitElement, css, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('mp-paragraph')
export class MpParagraph extends LitElement {
  static override styles = css`
    :host {
      display: block;
    }
    p {
      padding-bottom: 0.5rem;
    }
  `;

  override render(): TemplateResult {
    return html`<p><slot></slot></p>`;
  }
}
