import type { TemplateResult } from 'lit';
import { h, LitElement, property } from '@arcgis/lumina';
import type { RootLayoutMetadata } from '../../layouts/mp-root-layout/mp-root-layout';
import type { LayoutBase } from '../../layouts/types';
import type { ProjectMetadata } from '../../layouts/mp-project-layout/mp-project-layout';

/** @public */
interface HomeLayoutMetadata extends RootLayoutMetadata {
  /** @public */
  readonly authorTitle: string;
  /** @public */
  readonly links: readonly { readonly label: string; readonly url: string }[];
  /** @public */
  readonly projects: Record<string, ProjectMetadata>;
}

declare global {
  interface DeclareElements {
    'mp-home': MpHome;
  }
}

/** @public */
export class MpHome extends LitElement implements LayoutBase {
  //#region Public Properties

  /** @public */
  @property() layoutData?: HomeLayoutMetadata;

  //#endregion

  //#region Rendering

  override render(): TemplateResult {
    if (this.layoutData === undefined) {
      throw Error('layoutData is required for MpHome');
    }
    const { projects } = this.layoutData;
    return (
      <div class="home-layout">
        There are {Object.keys(projects).length} projects
        <slot />
      </div>
    );
  }

  //#endregion
}
