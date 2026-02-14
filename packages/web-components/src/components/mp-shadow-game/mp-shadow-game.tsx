import { h, LitElement, state } from '@arcgis/lumina';
import { css, type TemplateResult } from 'lit';

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

declare global {
  interface DeclareElements {
    'mp-shadow-game': MpShadowGame;
  }
}

export class MpShadowGame extends LitElement {
  //#region Static Members

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

  //#endregion

  //#region Private Properties

  hadInteractions = false;

  vibrationTimeout?: number;

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

  //#endregion

  //#region State Properties

  @state() state: ShadowState = {
    point: { x: 0, y: 0 },
    errorRadius: 0,
    vibrationDuration: 0,
  };

  //#endregion

  //#region Lifecycle

  load(): void {
    if (typeof window === 'undefined') {
      return;
    }

    this.dispatch({ type: 'GenerateRandomPointAction' });
    window.addEventListener('mousedown', this.handleMouseDown);
    window.addEventListener('resize', this.handleResize);
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

  //#endregion

  //#region Private Methods

  private dispatch(action: Action): void {
    this.state = reducer(this.state, action);
  }

  //#endregion

  //#region Rendering

  override render(): TemplateResult {
    return <div class="screen" />;
  }

  //#endregion
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
