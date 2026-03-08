import type { TemplateResult } from 'lit';
import { h, Fragment, LitElement, property } from '@arcgis/lumina';
import type { LayoutBase } from '../../layouts/types';
import commonStyles from '../../../styles/common.css';
import pageListStyles from '../../../styles/page-list.css';
import styles from './mp-home.css';
import type { ProjectsPageMetadata } from '../mp-projects/mp-projects';
import { PageList } from '../../molecules/PageList';
import { chevronRightSvg } from '../../atoms/icons';
import type { ArticlesPageMetadata } from '../mp-articles/mp-articles';
import type { RootLayoutMetadata } from '../../layouts/mp-root-layout/mp-root-layout';

/** @public */
interface HomePageMetadata
  extends
    RootLayoutMetadata,
    Pick<ProjectsPageMetadata, 'projects'>,
    Pick<ArticlesPageMetadata, 'articles'> {
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
    const { projects, links, authorTitle, siteConfig, articles } =
      this.layoutData!;
    const projectEntries = Object.entries(projects);
    const articlesEntries = Object.entries(articles);
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
          <section>
            <h2>Projects</h2>
            <PageList
              pages={Object.fromEntries(
                projectEntries.filter(
                  ([_, project]) => project.isFeatured === true,
                ),
              )}
              prefix="projects"
            />
            <a href="/projects/">
              {chevronRightSvg} See all {projectEntries.length - 1} projects
            </a>
          </section>
          <section>
            <h2>Articles</h2>
            <PageList
              pages={Object.fromEntries(
                articlesEntries.filter(
                  ([_, article]) => article.isFeatured === true,
                ),
              )}
              prefix="articles"
            />
            <a href="/articles/">
              {chevronRightSvg} See all {articlesEntries.length - 1} articles
            </a>
          </section>
        </main>
      </>
    );
  }

  //#endregion
}
