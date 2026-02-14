import { h, LitElement, property } from '@arcgis/lumina';
import { css, type TemplateResult } from 'lit';

declare global {
  interface DeclareElements {
    'mp-button': MpButton;
  }
}

export class MpButton extends LitElement {
  //#region Static Members

  static override styles = css`
    button {
      display: inline-flex;
      padding: 0.5rem 1rem;
      border-radius: 0.375rem;
      font-size: 0.875rem;
      line-height: 1.25rem;
      color: #404040;
      border: none;
      cursor: pointer;
    }
    :host([variant='danger']) button {
      background: #dc2626;
    }
    :host([variant='danger']) button:hover {
      background: #b91c1c;
    }
  `;

  //#endregion

  //#region Public Properties

  @property() variant: 'danger' | 'default' = 'default';

  //#endregion

  //#region Rendering

  override render(): TemplateResult {
    return (
      <button type="button">
        <slot />
      </button>
    );
  }

  //#endregion
}
