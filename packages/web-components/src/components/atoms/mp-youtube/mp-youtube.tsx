import { h, LitElement, property } from '@arcgis/lumina';
import type { TemplateResult } from 'lit';
import { styles } from './mp-youtube.css';
import { VideoPlayer } from './functional';

declare global {
  interface DeclareElements {
    'mp-youtube': MpYoutube;
  }
}

export class MpYoutube extends LitElement {
  //#region Static Members

  static override styles = styles;

  //#endregion

  //#region Public Properties

  @property() video = '';

  @property() caption = '';

  @property() start?: number;

  //#endregion

  //#region Rendering

  override render(): TemplateResult {
    // FEATURE: figure out a clean way to get the page url here
    /*const origin =
      typeof document !== 'undefined' ? document.location.origin : '';
    const referrer =
      typeof document !== 'undefined' ? document.location.href : '';
    origin=${encodeURIComponent(origin)}&widget_referrer=${encodeURIComponent(referrer)}&*/
    const startParam = this.start !== undefined ? `&start=${this.start}` : '';
    const src = `https://www.youtube.com/embed/${this.video}?playlist=${this.video}&loop=1${startParam}`;

    return <VideoPlayer caption={this.caption} src={src} />;
  }

  //#endregion
}
