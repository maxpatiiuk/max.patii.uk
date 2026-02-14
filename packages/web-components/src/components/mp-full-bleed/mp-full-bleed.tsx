import { h, LitElement } from '@arcgis/lumina';
import { css, type TemplateResult } from 'lit';

declare global {
  interface DeclareElements {
    'mp-full-bleed': MpFullBleed;
  }
}

export class MpFullBleed extends LitElement {
  //#region Static Members

  static override styles = css`
    :host {
      display: block;
      grid-column: 1 / -1;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  `;

  //#endregion

  //#region Rendering

  override render(): TemplateResult {
    return <slot />;
  }

  //#endregion
}
