import { h, LitElement, state } from '@arcgis/lumina';
import type { TemplateResult } from 'lit';
import { styles } from './mp-stopwatch.css';

const MINUTES = 60;
const SECONDS = 60;
const MILLISECONDS = 1000;

type MainState = {
  type: 'MainState';
  beginTime: number;
};

type PausedState = {
  type: 'PausedState';
  beginTime: number;
  endTime: number;
};

type StopwatchState = MainState | PausedState;

type Action =
  | { type: 'ChangeTimeAction'; duration: number }
  | { type: 'PauseResumeAction' }
  | { type: 'StartStopAction' };

declare global {
  interface DeclareElements {
    'mp-stopwatch': MpStopwatch;
  }
}

export class MpStopwatch extends LitElement {
  //#region Static Members

  static override styles = styles;

  //#endregion

  //#region Private Properties

  tickTimeout?: number;

  private readonly handleRewind = (): void => {
    this.dispatch({ type: 'ChangeTimeAction', duration: -MILLISECONDS });
  };

  private readonly handlePauseResume = (): void => {
    this.dispatch({ type: 'PauseResumeAction' });
  };

  private readonly handleForward = (): void => {
    this.dispatch({ type: 'ChangeTimeAction', duration: MILLISECONDS });
  };

  private readonly handleStartStop = (): void => {
    this.dispatch({ type: 'StartStopAction' });
  };

  //#endregion

  //#region State Properties

  @state() state: StopwatchState = {
    type: 'PausedState',
    beginTime: 0,
    endTime: 0,
  };

  //#endregion

  //#region Lifecycle

  override updated(changed: Map<PropertyKey, unknown>): void {
    if (changed.has('state')) {
      this.scheduleTick();
    }
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this.tickTimeout !== undefined) {
      window.clearTimeout(this.tickTimeout);
    }
  }

  //#endregion

  //#region Private Methods

  private dispatch(action: Action): void {
    this.state = reducer(this.state, action);
  }

  private scheduleTick(): void {
    if (typeof window === 'undefined') {
      return;
    }
    if (this.tickTimeout !== undefined) {
      window.clearTimeout(this.tickTimeout);
    }
    if (this.state.type !== 'MainState') {
      return;
    }

    const delay =
      MILLISECONDS -
      (Date.now() % MILLISECONDS) +
      (this.state.beginTime % MILLISECONDS);

    this.tickTimeout = window.setTimeout(() => {
      this.requestUpdate();
      this.scheduleTick();
    }, delay);
  }

  //#endregion

  //#region Rendering

  override render(): TemplateResult {
    const time =
      this.state.type === 'MainState'
        ? formatTime(Date.now() - this.state.beginTime, false)
        : formatTime(this.state.endTime - this.state.beginTime, true);

    return (
      <div class="container">
        <div class="display">{time}</div>
        <div class="row">
          <button
            type="button"
            aria-label="Rewind"
            title="Rewind"
            onClick={this.handleRewind}
          />
          <button
            type="button"
            aria-label="Pause"
            title="Pause"
            onClick={this.handlePauseResume}
          />
          <button
            type="button"
            aria-label="Forward"
            title="Forward"
            onClick={this.handleForward}
          />
        </div>
        <button
          type="button"
          aria-label="Start/Stop"
          title="Start/Stop"
          onClick={this.handleStartStop}
        />
      </div>
    );
  }

  //#endregion
}

function reducer(state: StopwatchState, action: Action): StopwatchState {
  switch (action.type) {
    case 'PauseResumeAction':
      return state.type === 'MainState'
        ? {
            type: 'PausedState',
            beginTime: state.beginTime,
            endTime: Date.now(),
          }
        : {
            type: 'MainState',
            beginTime: Date.now() - (state.endTime - state.beginTime),
          };
    case 'StartStopAction':
      return state.type === 'MainState'
        ? {
            type: 'PausedState',
            beginTime: state.beginTime,
            endTime: Date.now(),
          }
        : { type: 'MainState', beginTime: Date.now() };
    case 'ChangeTimeAction':
      return state.type === 'MainState'
        ? {
            type: 'MainState',
            beginTime:
              state.beginTime -
              (state.beginTime - action.duration > Date.now()
                ? 0
                : action.duration),
          }
        : {
            type: 'PausedState',
            beginTime:
              state.beginTime -
              (state.endTime - (state.beginTime + action.duration) < 0
                ? 0
                : action.duration),
            endTime: state.endTime,
          };
  }
}

function formatTime(time: number, includeMilliseconds = false): string {
  const hours = Math.floor(time / MILLISECONDS / SECONDS / MINUTES);
  const minutes = Math.floor(time / MILLISECONDS / SECONDS) - hours * MINUTES;
  const seconds =
    Math.floor(time / MILLISECONDS) - hours * MINUTES - minutes * SECONDS;
  const milliseconds = time % MILLISECONDS;
  const results: number[] = [];
  if (hours > 0) {
    results.push(hours);
  }
  if (hours > 0 || minutes > 0) {
    results.push(minutes);
  }
  if (hours > 0 || minutes > 0 || seconds > 0) {
    results.push(seconds);
  }
  if (results.length === 0 && milliseconds === 0) {
    return '';
  }
  return `${results
    .map((number, index) =>
      index === 0 ? number : String(number).padStart(2, '0'),
    )
    .join(':')}${includeMilliseconds ? `.${milliseconds}` : ''}`;
}
