import { h, LitElement, property } from '@arcgis/lumina';
import { css, type TemplateResult } from 'lit';

declare global {
  interface DeclareElements {
    'mp-link': MpLink;
  }
}

export class MpLink extends LitElement {
  //#region Static Members

  static override styles = css`
    a {
      color: white;
      text-decoration: underline;
    }
    a:hover {
      color: #d4d4d4;
    }
  `;

  //#endregion

  //#region Public Properties

  @property() href = '';

  //#endregion

  //#region Rendering

  override render(): TemplateResult {
    return (
      <a href={this.href} target="_blank" rel="noopener noreferrer">
        <slot />
      </a>
    );
  }

  //#endregion
}
