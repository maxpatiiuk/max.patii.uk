import { h, LitElement } from '@arcgis/lumina';
import { css, type TemplateResult } from 'lit';

declare global {
  interface DeclareElements {
    'mp-paragraph': MpParagraph;
  }
}

export class MpParagraph extends LitElement {
  //#region Static Members

  static override styles = css`
    :host {
      display: block;
    }
    p {
      padding-bottom: 0.5rem;
    }
  `;

  //#endregion

  //#region Rendering

  override render(): TemplateResult {
    return (
      <p>
        <slot />
      </p>
    );
  }

  //#endregion
}
