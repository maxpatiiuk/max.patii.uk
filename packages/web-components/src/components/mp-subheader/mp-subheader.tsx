import { h, LitElement } from '@arcgis/lumina';
import { css, type TemplateResult } from 'lit';

declare global {
  interface DeclareElements {
    'mp-subheader': MpSubheader;
  }
}

export class MpSubheader extends LitElement {
  //#region Static Members

  static override styles = css`
    :host {
      display: block;
    }
    h3 {
      padding-top: 0.5rem;
      padding-bottom: 0.25rem;
      font-size: 1.25rem;
      line-height: 1.75rem;
    }
  `;

  //#endregion

  //#region Rendering

  override render(): TemplateResult {
    return (
      <h3>
        <slot />
      </h3>
    );
  }

  //#endregion
}
