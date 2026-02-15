import { h, LitElement } from '@arcgis/lumina';
import type { TemplateResult } from 'lit';
import { styles } from './mp-paragraph.css';

declare global {
  interface DeclareElements {
    'mp-paragraph': MpParagraph;
  }
}

export class MpParagraph extends LitElement {
  //#region Static Members

  static override styles = styles;

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
