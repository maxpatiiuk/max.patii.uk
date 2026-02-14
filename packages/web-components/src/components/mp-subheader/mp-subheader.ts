import { LitElement, css, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('mp-subheader')
export class MpSubheader extends LitElement {
  static override styles = css`
    :host {
      display: block;
    }
    h3 {
      padding-top: 0.5rem;
      padding-bottom: 0.25rem;
      font-size: 1.25rem;
      line-height: 1.75rem;
    }
  `;

  override render(): TemplateResult {
    return html`<h3><slot></slot></h3>`;
  }
}
