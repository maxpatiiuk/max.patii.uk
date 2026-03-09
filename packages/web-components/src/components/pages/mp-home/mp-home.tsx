import type { TemplateResult } from 'lit';
import { h, Fragment, LitElement, property } from '@arcgis/lumina';
import type { LayoutBase } from '../../layouts/types';
import commonStyles from '../../../styles/common.css';
import pageListStyles from '../../../styles/page-list.css';
import styles from './mp-home.css';
import { PageList } from '../../molecules/PageList';
import { chevronRightSvg } from '../../atoms/icons';
import type { RootLayoutMetadata } from '../../layouts/mp-root-layout/mp-root-layout';
import type { PageListPageMetadata } from '../mp-page-list/mp-page-list';

/** @public */
interface HomePageMetadata extends RootLayoutMetadata {
  /** @public */
  readonly authorTitle: string;
  /** @public */
  readonly links: readonly { readonly label: string; readonly url: string }[];
  /** @public */
  readonly projects: PageListPageMetadata['pages'];
  /** @public */
  readonly articles: PageListPageMetadata['pages'];
  /** @public */
  readonly talks: PageListPageMetadata['pages'];
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
    const { projects, links, authorTitle, siteConfig, articles, talks } =
      this.layoutData!;
    const projectEntries = Object.entries(projects);
    const articlesEntries = Object.entries(articles);
    const talksEntries = Object.entries(talks);
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
            <h2>Talks</h2>
            <PageList
              pages={Object.fromEntries(
                talksEntries.filter(([_, talk]) => talk.isFeatured === true),
              )}
              prefix="talks"
            />
            <a href="/talks/">
              {chevronRightSvg} See all {talksEntries.length - 1} talks
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
