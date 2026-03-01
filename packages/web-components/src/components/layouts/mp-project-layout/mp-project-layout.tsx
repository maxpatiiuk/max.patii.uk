import { h, LitElement, property } from '@arcgis/lumina';
import type { TemplateResult } from 'lit';
import type { RootLayoutMetadata } from '../mp-root-layout/mp-root-layout';
import type { LayoutBase } from '../types';
import { chevronLeftSvg, githubSvg } from '../../atoms/icons';
import styles from './mp-project-layout.css';
import commonStyles from '../../../styles/common.css';

/** @public */
export interface ProjectMetadata extends RootLayoutMetadata {
  /** @public */
  readonly gitHub?: string;
}

declare global {
  interface DeclareElements {
    'mp-project-layout': MpProjectLayout;
  }
}

/** @public */
export class MpProjectLayout extends LitElement implements LayoutBase {
  //#region Static Members

  static override styles = [commonStyles, styles];

  //#endregion

  //#region Public Properties

  /** @public */
  @property() layoutData?: ProjectMetadata;

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
        <header>
          <nav>
            <a href="/">{chevronLeftSvg} Return to homepage</a>
            {githubLink}
          </nav>
          <hgroup>
            <h1>{title}</h1>
            {description !== undefined ? <p>{description}</p> : ''}
          </hgroup>
        </header>
        <slot />
      </main>
    );
  }

  //#endregion
}
