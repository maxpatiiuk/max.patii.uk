import { h, LitElement, property } from '@arcgis/lumina';
import type { TemplateResult } from 'lit';
import { styles } from './mp-vimeo.css';

declare global {
  interface DeclareElements {
    'mp-vimeo': MpVimeo;
  }
}

export class MpVimeo extends LitElement {
  //#region Static Members

  static override styles = styles;

  //#endregion

  //#region Public Properties

  @property() video = '';

  @property() caption = '';

  //#endregion

  //#region Rendering

  override render(): TemplateResult {
    const src = `https://player.vimeo.com/video/${this.video}`;

    return (
      <span>
        <h2>{this.caption}</h2>
        <div class="description">
          <slot name="description" />
        </div>
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
