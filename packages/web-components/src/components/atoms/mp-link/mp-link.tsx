import { h, LitElement, property } from '@arcgis/lumina';
import type { TemplateResult } from 'lit';
import { styles } from './mp-link.css';

declare global {
  interface DeclareElements {
    'mp-link': MpLink;
  }
}

export class MpLink extends LitElement {
  //#region Static Members

  static override styles = styles;

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
