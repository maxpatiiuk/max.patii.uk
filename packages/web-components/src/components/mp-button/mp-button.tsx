import { h, LitElement, property } from '@arcgis/lumina';
import type { TemplateResult } from 'lit';
import { styles } from './mp-button.css';

declare global {
  interface DeclareElements {
    'mp-button': MpButton;
  }
}

export class MpButton extends LitElement {
  //#region Static Members

  static override styles = styles;

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
