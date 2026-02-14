import { h, LitElement } from '@arcgis/lumina';
import { css, type TemplateResult } from 'lit';

declare global {
  interface DeclareElements {
    'mp-header': MpHeader;
  }
}

export class MpHeader extends LitElement {
  //#region Static Members

  static override styles = css`
    :host {
      display: block;
    }
    h2 {
      padding-top: 1rem;
      padding-bottom: 0.25rem;
      font-size: 1.5rem;
      line-height: 2rem;
      color: #a3a3a3;
    }
  `;

  //#endregion

  //#region Rendering

  override render(): TemplateResult {
    return (
      <h2>
        <slot />
      </h2>
    );
  }

  //#endregion
}
