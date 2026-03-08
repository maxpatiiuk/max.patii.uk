import type { TemplateResult } from 'lit';
import { h, Fragment, LitElement, property } from '@arcgis/lumina';
import type { LayoutBase } from '../../layouts/types';
import commonStyles from '../../../styles/common.css';
import pageListStyles from '../../../styles/page-list.css';
import styles from './mp-home.css';
import type { ProjectsPageMetadata } from '../mp-projects/mp-projects';
import { ProjectList } from '../mp-projects/functional';
import { chevronRightSvg } from '../../atoms/icons';

/** @public */
interface HomePageMetadata extends ProjectsPageMetadata {
  /** @public */
  readonly authorTitle: string;
  /** @public */
  readonly links: readonly { readonly label: string; readonly url: string }[];
}

declare global {
  interface DeclareElements {
    'mp-home': MpHome;
  }
}

/** @public */
export class MpHome extends LitElement implements LayoutBase {
  //#region Static Members
  static override styles = [commonStyles, pageListStyles, styles];

  //#endregion

  //#region Public Properties

  /** @public */
  @property() layoutData?: HomePageMetadata;

  //#endregion

  //#region Rendering

  override render(): TemplateResult {
    if (this.layoutData === undefined) {
      throw Error('layoutData is required for mp-home');
    }
    const { projects, links, authorTitle, siteConfig } = this.layoutData;
    const projectEntries = Object.entries(projects);
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
          <h2>Projects</h2>
          <ProjectList
            projects={Object.fromEntries(
              projectEntries.filter(
                ([_, project]) => project.isFeatured === true,
              ),
            )}
          />
          <a href="/projects/">
            {chevronRightSvg} View all {projectEntries.length} projects
          </a>
        </main>
      </>
    );
  }

  //#endregion
}
