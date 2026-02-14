import { LitElement, css, html, type TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';

const winStateDuration = 1000;
const vibrationScaler = 0.7;
const errorRadiusSize = 2 ** 4;

type Point = {
  x: number;
  y: number;
};

type ShadowState = {
  point: Point;
  errorRadius: number;
  vibrationDuration: number;
};

type Action =
  | { type: 'ClickAction'; point: Point }
  | { type: 'GenerateRandomPointAction' }
  | { type: 'ResizeAction' }
  | { type: 'StopVibrationAction' };

@customElement('mp-shadow-game')
export class MpShadowGame extends LitElement {
  @state() private state: ShadowState = {
    point: { x: 0, y: 0 },
    errorRadius: 0,
    vibrationDuration: 0,
  };

  private hadInteractions = false;
  private vibrationTimeout?: number;

  static override styles = css`
    :host {
      display: block;
      width: 100vw;
      height: 100vh;
      background: #000;
    }
    .screen {
      width: 100vw;
      height: 100vh;
      background: #000;
    }
  `;

  override connectedCallback(): void {
    super.connectedCallback();
    if (typeof window === 'undefined') {
      return;
    }

    this.dispatch({ type: 'GenerateRandomPointAction' });
    window.addEventListener('mousedown', this.handleMouseDown);
    window.addEventListener('resize', this.handleResize);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    if (typeof window === 'undefined') {
      return;
    }

    window.removeEventListener('mousedown', this.handleMouseDown);
    window.removeEventListener('resize', this.handleResize);
    if (this.vibrationTimeout !== undefined) {
      window.clearTimeout(this.vibrationTimeout);
    }
  }

  override updated(changed: Map<PropertyKey, unknown>): void {
    if (!changed.has('state')) {
      return;
    }

    if (this.state.vibrationDuration > 0) {
      if (this.hadInteractions && typeof navigator !== 'undefined') {
        navigator.vibrate(this.state.vibrationDuration);
      }
      if (this.vibrationTimeout !== undefined) {
        window.clearTimeout(this.vibrationTimeout);
      }
      this.vibrationTimeout = window.setTimeout(() => {
        this.dispatch({ type: 'StopVibrationAction' });
      }, this.state.vibrationDuration);
    }
  }

  private readonly handleMouseDown = (event: MouseEvent): void => {
    this.hadInteractions = true;
    this.dispatch({
      type: 'ClickAction',
      point: { x: event.x, y: event.y },
    });
  };

  private readonly handleResize = (): void => {
    this.dispatch({ type: 'ResizeAction' });
  };

  private dispatch(action: Action): void {
    this.state = reducer(this.state, action);
  }

  override render(): TemplateResult {
    return html`<div class="screen"></div>`;
  }
}

function reducer(state: ShadowState, action: Action): ShadowState {
  switch (action.type) {
    case 'ClickAction': {
      const distanceToPoint = Math.sqrt(
        (state.point.x - action.point.x) ** 2 +
          (state.point.y - action.point.y) ** 2,
      );

      return distanceToPoint < state.errorRadius
        ? {
            ...state,
            point: getRandomPoint(),
            vibrationDuration: winStateDuration,
          }
        : {
            ...state,
            vibrationDuration: Math.max(
              state.vibrationDuration,
              Math.ceil(
                (distanceToPoint / getWindowDiagonalSize()) *
                  (winStateDuration * vibrationScaler),
              ),
            ),
          };
    }
    case 'ResizeAction':
      return {
        ...state,
        errorRadius: calculateErrorRadius(),
        point: getRandomPoint(),
      };
    case 'GenerateRandomPointAction':
      return {
        point: getRandomPoint(),
        errorRadius: calculateErrorRadius(),
        vibrationDuration: winStateDuration,
      };
    case 'StopVibrationAction':
      return { ...state, vibrationDuration: 0 };
  }
}

function getRandomPoint(): Point {
  if (typeof window === 'undefined') {
    return { x: 0, y: 0 };
  }
  return {
    x: Math.floor(Math.random() * window.innerWidth),
    y: Math.floor(Math.random() * window.innerHeight),
  };
}

function getWindowDiagonalSize(): number {
  if (typeof window === 'undefined') {
    return 1;
  }
  return Math.sqrt(window.innerHeight ** 2 + window.innerWidth ** 2);
}

function calculateErrorRadius(): number {
  return Math.ceil(getWindowDiagonalSize() / errorRadiusSize);
}
