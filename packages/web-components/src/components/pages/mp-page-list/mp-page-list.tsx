import type { TemplateResult } from 'lit';
import { h, LitElement, property } from '@arcgis/lumina';
import type { RootLayoutMetadata } from '../../layouts/mp-root-layout/mp-root-layout';
import type { LayoutBase } from '../../layouts/types';
import type { PostPageMetadata } from '../../layouts/mp-post-layout/mp-post-layout';
import commonStyles from '../../../styles/common.css';
import centeredPageStyles from '../../../styles/centered-page.css';
import pageListStyles from '../../../styles/page-list.css';
import { Header, returnToHomepage } from '../../molecules/header';
import { PageList } from '../../molecules/PageList';

/** @public */
export interface PageListPageMetadata extends RootLayoutMetadata {
  /** @public */
  readonly pages: Record<string, PostPageMetadata>;
  /** @public */
  readonly title: string;
  /** @public */
  readonly prefix: string;
}

declare global {
  interface DeclareElements {
    'mp-page-list': MpPageList;
  }
}

/** @public */
export class MpPageList extends LitElement implements LayoutBase {
  //#region Static Members
  static override styles = [commonStyles, centeredPageStyles, pageListStyles];

  //#endregion

  //#region Public Properties

  /** @public */
  @property() layoutData?: PageListPageMetadata;

  //#endregion

  //#region Rendering

  override render(): TemplateResult {
    const { pages, title, prefix } = this.layoutData!;
    return (
      <main>
        <Header title={title}>{returnToHomepage}</Header>
        <PageList pages={pages} prefix={prefix} />
      </main>
    );
  }

  //#endregion
}
