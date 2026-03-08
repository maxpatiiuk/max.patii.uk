import type { TemplateResult } from 'lit';
import { h, LitElement, property } from '@arcgis/lumina';
import type { LayoutBase } from '../types';
import type { RootLayoutMetadata } from '../mp-root-layout/mp-root-layout';
import { chevronLeftSvg } from '../../atoms/icons';
import commonStyles from '../../../styles/common.css';
import styles from './mp-error-layout.css';

declare global {
  interface DeclareElements {
    'mp-error-layout': MpErrorLayout;
  }
}

/** @public */
export class MpErrorLayout extends LitElement implements LayoutBase {
  //#region Static Members

  static override styles = [commonStyles, styles];

  //#endregion

  //#region Public Properties

  /** @public */
  @property() layoutData?: RootLayoutMetadata;

  /** @public */
  @property() slotted?: TemplateResult;

  //#endregion

  //#region Rendering

  override render(): TemplateResult {
    return (
      <div class="error-layout">
        {this.slotted}
        {chevronLeftSvg}
      </div>
    );
  }

  //#endregion
}
