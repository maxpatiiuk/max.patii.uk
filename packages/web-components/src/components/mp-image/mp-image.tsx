import { h, LitElement, property } from '@arcgis/lumina';
import type { TemplateResult } from 'lit';
import { styles } from './mp-image.css';

declare global {
  interface DeclareElements {
    'mp-image': MpImage;
  }
}

export class MpImage extends LitElement {
  //#region Static Members

  static override styles = styles;

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
