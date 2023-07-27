/*
 * Action's reducer
 *
 */

import type { Action } from 'typesafe-reducer';
import { generateReducer } from 'typesafe-reducer';

import type {
  MainState,
  States,
} from '../../../components/projects/tetris/stateReducer';
import {
  getInitialState,
  mainState,
} from '../../../components/projects/tetris/stateReducer';
import { SHAPES } from '../../../const/projects/tetris/config';
import { Direction } from './definitions';
import { moveShape } from './transformShapes';
import { spawnNewShape, updateBoard } from './utilities';

type MoveAction = Action<
  'MoveAction',
  {
    direction: Direction;
  }
>;

type RestartGameAction = Action<'RestartGameAction'>;

type TogglePauseGameAction = Action<'TogglePauseGameAction'>;

type GravityAction = Action<
  'GravityAction',
  {
    seed: number;
  }
>;

type SaveGameAction = Action<'SaveGameAction'>;

type LoadGameAction = Action<'LoadGameAction'>;

type LoadHighScoreAction = Action<
  'LoadHighScoreAction',
  {
    highScore: number;
  }
>;

export type Actions =
  | MoveAction
  | RestartGameAction
  | TogglePauseGameAction
  | GravityAction
  | SaveGameAction
  | LoadGameAction
  | LoadHighScoreAction;

export const reducer = generateReducer<States, Actions>({
  MoveAction: ({ state, action: { direction } }) =>
    Object.keys(mainState(state).currentShapeLocation).length === 0 ||
    (mainState(state).paused &&
      // Don't cheat :)
      direction !== Direction.DOWN)
      ? state
      : updateBoard(
          mainState(state),
          moveShape(
            mainState(state).currentShapeLocation,
            direction,
            mainState(state).paused ? -1 : 1
          )
        ),
  RestartGameAction: ({ state }) => getInitialState(state.bestScore),
  TogglePauseGameAction: ({ state }) => ({
    ...mainState(state),
    paused: !mainState(state).paused,
  }),
  GravityAction: ({ state: initialState, action: { seed } }) => {
    const state = mainState(initialState);

    if (state.paused) return state;

    const shapeNames = Object.entries(SHAPES)
      .filter(([, { spawn }]) => spawn)
      .map(([shapeName]) => shapeName);

    const nextShape =
      state.nextShape === '_'
        ? shapeNames[seed % shapeNames.length]
        : state.nextShape;

    const newState: MainState = {
      ...state,
      nextShape,
    };

    return Object.keys(newState.currentShapeLocation).length === 0
      ? spawnNewShape(newState)
      : updateBoard(
          newState,
          moveShape(newState.currentShapeLocation, Direction.DOWN)
        );
  },
  SaveGameAction: ({ state }) => {
    localStorage.setItem('state', JSON.stringify(state));
    return state;
  },
  LoadGameAction({ state }) {
    const savedState = localStorage.getItem('state');
    return typeof savedState === 'string'
      ? (JSON.parse(savedState) as MainState)
      : state;
  },
  LoadHighScoreAction: ({ state, action: { highScore } }) => ({
    ...state,
    bestScore: highScore,
  }),
});
