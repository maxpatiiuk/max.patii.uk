import { h, LitElement } from '@arcgis/lumina';
import { css, type TemplateResult } from 'lit';

declare global {
  interface DeclareElements {
    'mp-aside': MpAside;
  }
}

export class MpAside extends LitElement {
  //#region Static Members

  static override styles = css`
    :host {
      display: block;
    }
    aside {
      border-left: 4px solid #525252;
      border-radius: 0.75rem;
      background: #404040;
      padding: 1.25rem;
      margin-top: 1rem;
      margin-bottom: 1rem;
    }
  `;

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
