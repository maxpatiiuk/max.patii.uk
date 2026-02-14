import { LitElement, css, html, type TemplateResult } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';

const MILLISECONDS = 1000;

type SnowCrashMode = 'binary' | 'grayscale' | 'hex';

function drawFrame(
  colorGenerator: () => number,
  monochrome: boolean,
  imageData: ImageData,
  context: CanvasRenderingContext2D,
): void {
  for (let i = 0; i < imageData.data.length; i += 4) {
    const color = colorGenerator();
    imageData.data[i] = color;
    imageData.data[i + 1] = monochrome ? color : colorGenerator();
    imageData.data[i + 2] = monochrome ? color : colorGenerator();
    imageData.data[i + 3] = 255;
  }

  context.putImageData(imageData, 0, 0);
}

@customElement('mp-snow-crash')
export class MpSnowCrash extends LitElement {
  @property() mode: SnowCrashMode = 'binary';

  @query('canvas') private readonly canvas?: HTMLCanvasElement;
  @state() private isPaused = false;

  private draw?: () => void;
  private animationId?: number;

  static override styles = css`
    :host {
      display: block;
      width: 100vw;
      height: 100vh;
    }
    canvas {
      display: block;
      width: 100vw;
      height: 100vh;
      cursor: pointer;
    }
  `;

  override connectedCallback(): void {
    super.connectedCallback();
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.handleResize);
    }
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.handleResize);
    }
    this.stopAnimation();
  }

  override firstUpdated(): void {
    this.setupCanvas();
  }

  override updated(changed: Map<PropertyKey, unknown>): void {
    if (changed.has('mode')) {
      this.setupCanvas();
    }
  }

  private readonly handleResize = (): void => {
    this.setupCanvas();
  };

  private setupCanvas(): void {
    if (typeof window === 'undefined') {
      return;
    }
    if (!this.canvas) {
      return;
    }

    const context = this.canvas.getContext('2d');
    if (!context) {
      return;
    }

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    context.imageSmoothingEnabled = false;

    const monochrome = this.mode !== 'hex';
    const colorGenerator = (): number => {
      if (this.mode === 'binary') {
        return Math.random() >= 0.5 ? 255 : 0;
      }
      return Math.floor(Math.random() * 256);
    };

    const imageData = context.createImageData(
      this.canvas.width,
      this.canvas.height,
    );

    this.draw = (): void =>
      drawFrame(colorGenerator, monochrome, imageData, context);

    if (!this.isPaused) {
      this.startAnimation();
    }
  }

  private startAnimation(): void {
    this.stopAnimation();

    const step = (): void => {
      if (this.isPaused) {
        return;
      }
      this.draw?.();
      this.animationId = window.requestAnimationFrame(step);
    };

    step();
  }

  private stopAnimation(): void {
    if (this.animationId !== undefined && typeof window !== 'undefined') {
      window.cancelAnimationFrame(this.animationId);
      this.animationId = undefined;
    }
  }

  private togglePause(): void {
    this.isPaused = !this.isPaused;
    if (!this.isPaused) {
      this.startAnimation();
    } else {
      this.stopAnimation();
    }
  }

  override render(): TemplateResult {
    return html`<canvas @click=${this.togglePause}></canvas>`;
  }
}

export const snowCrashTickInterval = MILLISECONDS;
