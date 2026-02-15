import type { TemplateResult } from 'lit';
import { h, LitElement, property } from '@arcgis/lumina';
import type { RootLayoutMetadata } from '../mp-root-layout/mp-root-layout';
import type { LayoutBase } from '../types';

/** @public */
interface HomeLayoutMetadata extends RootLayoutMetadata {
  /** @public */
  authorTitle: string;
  /** @public */
  links: { label: string; url: string }[];
}

declare global {
  interface DeclareElements {
    'mp-home-layout': MpHomeLayout;
  }
}

/** @public */
export class MpHomeLayout extends LitElement implements LayoutBase {
  //#region Public Properties

  /** @public */
  @property() layoutData?: HomeLayoutMetadata;

  //#endregion

  //#region Rendering

  override render(): TemplateResult {
    return (
      <mp-root-layout layoutData={this.layoutData}>
        <div class="home-layout">
          <slot />
        </div>
      </mp-root-layout>
    );
  }

  //#endregion
}
