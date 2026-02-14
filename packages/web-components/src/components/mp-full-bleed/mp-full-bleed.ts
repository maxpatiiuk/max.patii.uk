import { LitElement, css, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('mp-full-bleed')
export class MpFullBleed extends LitElement {
  static override styles = css`
    :host {
      display: block;
      grid-column: 1 / -1;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  `;

  override render(): TemplateResult {
    return html`<slot></slot>`;
  }
}
