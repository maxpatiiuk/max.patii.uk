import { h, LitElement, property, state } from '@arcgis/lumina';
import { isServer } from 'lit';
import type { TemplateResult } from 'lit';
import { styles } from './mp-snow-crash.css';

type SnowCrashMode = 'binary' | 'grayscale' | 'hex';

declare global {
  interface DeclareElements {
    'mp-snow-crash': MpSnowCrash;
  }
}

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

export class MpSnowCrash extends LitElement {
  //#region Static Members

  static override styles = styles;

  //#endregion

  //#region Private Properties

  canvas?: HTMLCanvasElement;

  draw?: () => void;

  animationId?: number;

  private readonly handleResize = (): void => {
    this.setupCanvas();
  };

  private togglePause = (): void => {
    this.isPaused = !this.isPaused;
    if (!this.isPaused) {
      this.startAnimation();
    } else {
      this.stopAnimation();
    }
  };

  //#endregion

  //#region State Properties

  @state() isPaused = false;

  //#endregion

  //#region Public Properties

  @property() mode: SnowCrashMode = 'binary';

  //#endregion

  //#region Lifecycle

  load(): void {
    if (typeof window === 'undefined') {
      return;
    }
    window.addEventListener('resize', this.handleResize);
  }

  override updated(changed: Map<PropertyKey, unknown>): void {
    if (changed.has('mode')) {
      this.setupCanvas();
    }
  }

  loaded(): void {
    this.setupCanvas();
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.handleResize);
    }
    this.stopAnimation();
  }

  //#endregion

  //#region Private Methods

  private setupCanvas(): void {
    if (typeof window === 'undefined') {
      return;
    }

    if (!this.canvas) {
      this.canvas = this.el.querySelector('canvas') ?? undefined;
      if (!this.canvas) {
        return;
      }
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

  //#endregion

  //#region Rendering

  override render(): TemplateResult | null {
    /* eslint-disable-next-line @typescript-eslint/no-unnecessary-condition */
    if (isServer) {
      return null;
    }
    return <canvas onClick={this.togglePause} />;
  }

  //#endregion
}
