import { LitElement, css, html, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('mp-image')
export class MpImage extends LitElement {
  @property() src = '';
  @property() alt = '';

  static override styles = css`
    :host {
      display: block;
      grid-column: 1 / -1;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    figure {
      margin-bottom: 1rem;
      background: #404040;
      padding: 0.25rem;
      padding-bottom: 0;
      border-radius: 0.75rem;
    }
    img {
      border-radius: 0.75rem;
      width: 100%;
      height: auto;
      object-fit: contain;
    }
    figcaption {
      padding: 0.5rem;
      text-align: center;
      color: #e5e5e5;
    }
    @media (min-width: 768px) {
      img {
        max-height: 80vh;
        max-width: 80vw;
      }
    }
  `;

  override render(): TemplateResult {
    return html`
      <figure>
        <img src=${this.src} alt=${this.alt} />
        <figcaption><slot></slot></figcaption>
      </figure>
    `;
  }
}
