import { h, LitElement, property } from '@arcgis/lumina';
import { css, type TemplateResult } from 'lit';

declare global {
  interface DeclareElements {
    'mp-image': MpImage;
  }
}

export class MpImage extends LitElement {
  //#region Static Members

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

  //#endregion

  //#region Public Properties

  @property() src = '';

  @property() alt = '';

  //#endregion

  //#region Rendering

  override render(): TemplateResult {
    return (
      <figure>
        <img src={this.src} alt={this.alt} />
        <figcaption>
          <slot />
        </figcaption>
      </figure>
    );
  }

  //#endregion
}
