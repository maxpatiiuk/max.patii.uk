import type { TemplateResult } from 'lit';
import { h, Fragment, LitElement, property } from '@arcgis/lumina';
import type { RootLayoutMetadata } from '../../layouts/mp-root-layout/mp-root-layout';
import type { LayoutBase } from '../../layouts/types';
import type { ProjectMetadata } from '../../layouts/mp-project-layout/mp-project-layout';
import styles from './mp-home.css';
import commonStyles from '../../../styles/common.css';

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
  //#region Static Members
  static override styles = [commonStyles, styles];

  //#endregion

  //#region Public Properties

  /** @public */
  @property() layoutData?: HomeLayoutMetadata;

  //#endregion

  //#region Rendering

  override render(): TemplateResult {
    if (this.layoutData === undefined) {
      throw Error('layoutData is required for mp-home');
    }
    const { projects, links, authorTitle, siteConfig } = this.layoutData;
    return (
      <>
        <header>
          <hgroup>
            <h1>{siteConfig.author}</h1>
            <p>{authorTitle}</p>
          </hgroup>
          <nav>
            <ul>
              {links.map(({ label, url }) => (
                <li>
                  <a href={url}>{label}</a>
                </li>
              ))}
            </ul>
          </nav>
        </header>
        <main>
          <h2>My projects</h2>
          {Object.entries(projects).map(([id, metadata]) =>
            metadata.description === undefined ? (
              ''
            ) : (
              <article>
                <a href={`/projects/${id}/`}>
                  <h3>{metadata.title}</h3>
                </a>
                <p>{metadata.description}</p>
              </article>
            ),
          )}
        </main>
      </>
    );
  }

  //#endregion
}
