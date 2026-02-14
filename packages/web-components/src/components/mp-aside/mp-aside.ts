import { LitElement, css, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('mp-aside')
export class MpAside extends LitElement {
  static override styles = css`
    :host {
      display: block;
    }
    aside {
      border-left: 4px solid #525252;
      border-radius: 0.75rem;
      background: #404040;
      padding: 1.25rem;
      margin-top: 1rem;
      margin-bottom: 1rem;
    }
  `;

  override render(): TemplateResult {
    return html`<aside><slot></slot></aside>`;
  }
}
