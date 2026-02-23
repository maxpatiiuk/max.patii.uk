import type { TemplateResult } from 'lit';
import { h, LitElement, property } from '@arcgis/lumina';
import type { LayoutBase } from '../types';
import type { RootLayoutMetadata } from '../mp-root-layout/mp-root-layout';
import { chevronLeftSvg } from '../../atoms/icons';

declare global {
  interface DeclareElements {
    'mp-error-layout': MpErrorLayout;
  }
}

/** @public */
export class MpErrorLayout extends LitElement implements LayoutBase {
  //#region Public Properties

  /** @public */
  @property() layoutData?: RootLayoutMetadata;

  //#endregion
  //#region Rendering

  override render(): TemplateResult {
    return (
      <div class="error-layout">
        <slot />
        {chevronLeftSvg}
      </div>
    );
  }

  //#endregion
}
