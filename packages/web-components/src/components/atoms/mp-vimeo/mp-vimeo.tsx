import { h, LitElement, property } from '@arcgis/lumina';
import type { TemplateResult } from 'lit';
import { styles } from '../mp-youtube/mp-youtube.css';
import { VideoPlayer } from '../mp-youtube/functional';

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

    return <VideoPlayer caption={this.caption} src={src} />;
  }

  //#endregion
}
