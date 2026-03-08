import { h, LitElement, property } from '@arcgis/lumina';
import type { TemplateResult } from 'lit';
import type { RootLayoutMetadata } from '../mp-root-layout/mp-root-layout';
import type { LayoutBase } from '../types';
import { githubSvg } from '../../atoms/icons';
import commonStyles from '../../../styles/common.css';
import centeredPageStyles from '../../../styles/centered-page.css';
import styles from './mp-project-layout.css';
import { Header, returnToProjects } from '../../atoms/header';

/** @public */
export interface ProjectMetadata extends RootLayoutMetadata {
  /** @public */
  readonly gitHub?: string;
  /** @public */
  readonly isFeatured?: boolean;
}

declare global {
  interface DeclareElements {
    'mp-project-layout': MpProjectLayout;
  }
}

/** @public */
export class MpProjectLayout extends LitElement implements LayoutBase {
  //#region Static Members

  static override styles = [commonStyles, centeredPageStyles, styles];

  //#endregion

  //#region Public Properties

  /** @public */
  @property() layoutData?: ProjectMetadata;

  /** @public */
  @property() slotted?: TemplateResult;

  //#endregion

  //#region Rendering

  override render(): TemplateResult {
    if (this.layoutData === undefined) {
      throw Error('layoutData is required for MpProjectLayout');
    }

    const { title, description, gitHub } = this.layoutData;

    const githubLink =
      gitHub !== undefined ? (
        <a href={gitHub}>{githubSvg} View this project on GitHub</a>
      ) : (
        ''
      );

    return (
      <main>
        <Header
          title={title}
          description={
            description === undefined ? undefined : <p>{description}</p>
          }
        >
          {returnToProjects}
          {githubLink}
        </Header>
        {this.slotted}
      </main>
    );
  }

  //#endregion
}
