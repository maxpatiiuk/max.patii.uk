import { h, LitElement, property } from '@arcgis/lumina';
import { css, type TemplateResult } from 'lit';

declare global {
  interface DeclareElements {
    'mp-list': MpList;
  }
}

export class MpList extends LitElement {
  //#region Static Members

  static override styles = css`
    :host {
      display: block;
    }
    p {
      padding-bottom: 0.25rem;
    }
    ul,
    ol {
      padding-left: 1.75rem;
      padding-bottom: 0.5rem;
      list-style: disc;
    }
    ol {
      list-style: decimal;
    }
    ::slotted(li) {
      padding-bottom: 0.5rem;
    }
  `;

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
