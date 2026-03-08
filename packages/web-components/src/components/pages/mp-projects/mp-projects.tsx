import type { TemplateResult } from 'lit';
import { h, LitElement, property } from '@arcgis/lumina';
import type { RootLayoutMetadata } from '../../layouts/mp-root-layout/mp-root-layout';
import type { LayoutBase } from '../../layouts/types';
import type { ProjectMetadata } from '../../layouts/mp-project-layout/mp-project-layout';
import commonStyles from '../../../styles/common.css';
import centeredPageStyles from '../../../styles/centered-page.css';
import pageListStyles from '../../../styles/page-list.css';
import { Header, returnToHomepage } from '../../atoms/header';
import { ProjectList } from './functional';

/** @public */
export interface ProjectsPageMetadata extends RootLayoutMetadata {
  /** @public */
  readonly projects: Record<string, ProjectMetadata>;
}

declare global {
  interface DeclareElements {
    'mp-projects': MpProjects;
  }
}

/** @public */
export class MpProjects extends LitElement implements LayoutBase {
  //#region Static Members
  static override styles = [commonStyles, centeredPageStyles, pageListStyles];

  //#endregion

  //#region Public Properties

  /** @public */
  @property() layoutData?: ProjectsPageMetadata;

  //#endregion

  //#region Rendering

  override render(): TemplateResult {
    if (this.layoutData === undefined) {
      throw Error('layoutData is required for mp-projects');
    }
    const { projects } = this.layoutData;
    return (
      <main>
        <Header title="My Projects">{returnToHomepage}</Header>
        <ProjectList projects={projects} />
      </main>
    );
  }

  //#endregion
}
