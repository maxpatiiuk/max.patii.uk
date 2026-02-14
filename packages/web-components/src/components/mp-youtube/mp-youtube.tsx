import { h, LitElement, property } from '@arcgis/lumina';
import type { TemplateResult } from 'lit';
import { styles } from './mp-youtube.css';

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

  @property({}) start?: number;

  //#endregion

  //#region Rendering

  override render(): TemplateResult {
    const origin =
      typeof document !== 'undefined' ? document.location.origin : '';
    const referrer =
      typeof document !== 'undefined' ? document.location.href : '';
    const startParam = this.start !== undefined ? `&start=${this.start}` : '';
    const src = `https://www.youtube.com/embed/${this.video}?origin=${encodeURIComponent(origin)}&widget_referrer=${encodeURIComponent(referrer)}&playlist=${this.video}&loop=1${startParam}`;

    const hasDescription =
      this.el.querySelector('[slot="description"]') !== null;

    return (
      <span>
        <h2>{this.caption}</h2>
        {hasDescription ? (
          <div class="description">
            <slot name="description" />
          </div>
        ) : null}
        <div class="wrapper">
          <iframe
            width="640"
            height="360"
            title={this.caption}
            src={src}
            allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          />
        </div>
      </span>
    );
  }

  //#endregion
}
