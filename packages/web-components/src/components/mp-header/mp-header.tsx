import { h, LitElement } from '@arcgis/lumina';
import type { TemplateResult } from 'lit';
import { styles } from './mp-header.css';

declare global {
  interface DeclareElements {
    'mp-header': MpHeader;
  }
}

export class MpHeader extends LitElement {
  //#region Static Members

  static override styles = styles;

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
