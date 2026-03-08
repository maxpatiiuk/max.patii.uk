import { h, Fragment, LitElement, property } from '@arcgis/lumina';
import type { TemplateResult } from 'lit';
import type { RootLayoutMetadata } from '../mp-root-layout/mp-root-layout';
import type { LayoutBase } from '../types';
import { githubSvg } from '../../atoms/icons';
import commonStyles from '../../../styles/common.css';
import centeredPageStyles from '../../../styles/centered-page.css';
import styles from './mp-post-layout.css';
import {
  Header,
  returnToArticles,
  returnToProjects,
} from '../../molecules/header';
import { Time } from '../../atoms/time';

/** @public */
export interface PostPageMetadata extends RootLayoutMetadata {
  /** @public */
  readonly gitHub?: string;
  /** @public */
  readonly isFeatured?: boolean;
  /** @public */
  readonly seriesName?: string;
  /** @public */
  readonly devToCommentsLinks?: string;
  /** @public */
  readonly kind: 'article' | 'index' | 'project';
}

declare global {
  interface DeclareElements {
    'mp-post-layout': MpPostLayout;
  }
}

/** @public */
export class MpPostLayout extends LitElement implements LayoutBase {
  //#region Static Members

  static override styles = [commonStyles, centeredPageStyles, styles];

  //#endregion

  //#region Public Properties

  /** @public */
  @property() layoutData?: PostPageMetadata;

  /** @public */
  @property() slotted?: TemplateResult;

  //#endregion

  //#region Rendering

  override render(): TemplateResult {
    const {
      title,
      description,
      gitHub,
      seriesName,
      date,
      devToCommentsLinks,
      kind,
    } = this.layoutData!;

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
            description !== undefined || date !== undefined ? (
              <p>
                {description}
                {date !== undefined && description !== undefined ? <br /> : ''}
                {date !== undefined ? (
                  <>
                    {kind === 'article' ? `Published on` : `Developed in`}{' '}
                    <Time date={date} />
                  </>
                ) : undefined}
              </p>
            ) : undefined
          }
        >
          {kind === 'article' ? returnToArticles : returnToProjects}
          {githubLink}
        </Header>
        {this.slotted}
      </main>
    );
  }

  //#endregion
}
