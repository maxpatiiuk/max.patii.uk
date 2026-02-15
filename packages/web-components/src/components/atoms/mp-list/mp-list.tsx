import { h, LitElement, property } from '@arcgis/lumina';
import type { TemplateResult } from 'lit';
import { styles } from './mp-list.css';

declare global {
  interface DeclareElements {
    'mp-list': MpList;
  }
}

export class MpList extends LitElement {
  //#region Static Members

  static override styles = styles;

  //#endregion

  //#region Public Properties

  @property() caption = '';

  @property() type: 'ol' | 'ul' = 'ul';

  //#endregion

  //#region Rendering

  override render(): TemplateResult {
    const captionEl = this.caption !== '' ? <p>{this.caption}</p> : null;

    return this.type === 'ol' ? (
      <span>
        {captionEl}
        <ol>
          <slot />
        </ol>
      </span>
    ) : (
      <span>
        {captionEl}
        <ul>
          <slot />
        </ul>
      </span>
    );
  }

  //#endregion
}
