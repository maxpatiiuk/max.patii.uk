import { h, LitElement, property } from '@arcgis/lumina';
import { css, type TemplateResult } from 'lit';

declare global {
  interface DeclareElements {
    'mp-vimeo': MpVimeo;
  }
}

export class MpVimeo extends LitElement {
  //#region Static Members

  static override styles = css`
    :host {
      display: block;
      grid-column: 1 / -1;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    h2 {
      padding-top: 1rem;
      padding-bottom: 0.25rem;
      font-size: 1.5rem;
      line-height: 2rem;
      color: #a3a3a3;
      align-self: stretch;
    }
    .description {
      align-self: stretch;
    }
    .wrapper {
      background: #404040;
      display: flex;
      justify-content: center;
      margin-bottom: 1.25rem;
      padding: 0.25rem;
      border-radius: 0.75rem;
    }
    iframe {
      background: #171717;
      max-width: 100%;
      border-radius: 0.75rem;
      border: 0;
    }
  `;

  //#endregion

  //#region Public Properties

  @property() video = '';

  @property() caption = '';

  //#endregion

  //#region Rendering

  override render(): TemplateResult {
    const src = `https://player.vimeo.com/video/${this.video}`;
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
