import { LitElement, css, html, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('mp-link')
export class MpLink extends LitElement {
  @property() href = '';

  static override styles = css`
    a {
      color: white;
      text-decoration: underline;
    }
    a:hover {
      color: #d4d4d4;
    }
  `;

  override render(): TemplateResult {
    return html`<a href=${this.href} target="_blank" rel="noopener noreferrer">
      <slot></slot>
    </a>`;
  }
}
