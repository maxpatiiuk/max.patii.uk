import { LitElement, css, html, nothing, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('mp-list')
export class MpList extends LitElement {
  @property() caption = '';
  @property() type: 'ol' | 'ul' = 'ul';

  static override styles = css`
    :host {
      display: block;
    }
    p {
      padding-bottom: 0.25rem;
    }
    ul,
    ol {
      padding-left: 1.75rem;
      padding-bottom: 0.5rem;
      list-style: disc;
    }
    ol {
      list-style: decimal;
    }
    ::slotted(li) {
      padding-bottom: 0.5rem;
    }
  `;

  override render(): TemplateResult {
    const captionEl =
      this.caption !== '' ? html`<p>${this.caption}</p>` : nothing;

    return this.type === 'ol'
      ? html`${captionEl}
          <ol>
            <slot></slot>
          </ol>`
      : html`${captionEl}
          <ul>
            <slot></slot>
          </ul>`;
  }
}
