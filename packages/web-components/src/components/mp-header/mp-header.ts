import { LitElement, css, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('mp-header')
export class MpHeader extends LitElement {
  static override styles = css`
    :host {
      display: block;
    }
    h2 {
      padding-top: 1rem;
      padding-bottom: 0.25rem;
      font-size: 1.5rem;
      line-height: 2rem;
      color: #a3a3a3;
    }
  `;

  override render(): TemplateResult {
    return html`<h2><slot></slot></h2>`;
  }
}
