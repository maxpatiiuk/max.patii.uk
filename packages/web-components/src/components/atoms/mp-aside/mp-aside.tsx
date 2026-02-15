import { h, LitElement } from '@arcgis/lumina';
import type { TemplateResult } from 'lit';
import { styles } from './mp-aside.css';

declare global {
  interface DeclareElements {
    'mp-aside': MpAside;
  }
}

// TODO: refactor out explicit usages in favor of > markdown
export class MpAside extends LitElement {
  //#region Static Members

  static override styles = styles;

  //#endregion

  //#region Rendering

  override render(): TemplateResult {
    return (
      <aside>
        <slot />
      </aside>
    );
  }

  //#endregion
}
