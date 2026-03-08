import type { TemplateResult } from 'lit';
import { h, LitElement, property } from '@arcgis/lumina';
import type { RootLayoutMetadata } from '../../layouts/mp-root-layout/mp-root-layout';
import type { LayoutBase } from '../../layouts/types';
import commonStyles from '../../../styles/common.css';
import centeredPageStyles from '../../../styles/centered-page.css';
import pageListStyles from '../../../styles/page-list.css';
import { Header, returnToHomepage } from '../../molecules/header';
import { PageList } from '../../molecules/PageList';
import type { PostPageMetadata } from '../../layouts/mp-post-layout/mp-post-layout';

/** @public */
export interface ArticlesPageMetadata extends RootLayoutMetadata {
  /** @public */
  articles: Record<string, PostPageMetadata>;
}

declare global {
  interface DeclareElements {
    'mp-articles': MpArticles;
  }
}

/** @public */
export class MpArticles extends LitElement implements LayoutBase {
  //#region Static Members
  static override styles = [commonStyles, centeredPageStyles, pageListStyles];

  //#endregion

  //#region Public Properties

  /** @public */
  @property() layoutData?: ArticlesPageMetadata;

  //#endregion

  //#region Rendering

  override render(): TemplateResult {
    const { articles } = this.layoutData!;
    return (
      <main>
        <Header title="My Articles">{returnToHomepage}</Header>
        <PageList pages={articles} prefix="articles" />
      </main>
    );
  }

  //#endregion
}
