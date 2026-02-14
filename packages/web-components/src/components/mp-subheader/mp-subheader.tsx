import { h, LitElement } from '@arcgis/lumina';
import type { TemplateResult } from 'lit';
import { styles } from './mp-subheader.css';

declare global {
  interface DeclareElements {
    'mp-subheader': MpSubheader;
  }
}

export class MpSubheader extends LitElement {
  //#region Static Members

  static override styles = styles;

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
