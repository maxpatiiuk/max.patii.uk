import { h, LitElement } from '@arcgis/lumina';
import type { TemplateResult } from 'lit';
import { styles } from './mp-full-bleed.css';

declare global {
  interface DeclareElements {
    'mp-full-bleed': MpFullBleed;
  }
}

export class MpFullBleed extends LitElement {
  //#region Static Members

  static override styles = styles;

  //#endregion

  //#region Rendering

  override render(): TemplateResult {
    return <slot />;
  }

  //#endregion
}
