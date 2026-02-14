import { LitElement, css, html, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('mp-button')
export class MpButton extends LitElement {
  @property() variant: 'danger' | 'default' = 'default';

  static override styles = css`
    button {
      display: inline-flex;
      padding: 0.5rem 1rem;
      border-radius: 0.375rem;
      font-size: 0.875rem;
      line-height: 1.25rem;
      color: #404040;
      border: none;
      cursor: pointer;
    }
    :host([variant='danger']) button {
      background: #dc2626;
    }
    :host([variant='danger']) button:hover {
      background: #b91c1c;
    }
  `;

  override render(): TemplateResult {
    return html`<button type="button"><slot></slot></button>`;
  }
}
