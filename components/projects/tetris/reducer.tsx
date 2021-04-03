/*
* Action's reducer
* */

import { SHAPES } from '../../../const/projects/tetris/config';
import { DIRECTION } from '../../../lib/projects/tetris/definitions';
import { moveShape } from '../../../lib/projects/tetris/transofrmShapes';
import {
  spawnNewShape,
  updateBoard,
} from '../../../lib/projects/tetris/utilities';
import { Action, generateReducer } from '../../../lib/stateManagement';
import { getInitialState, MainState, mainState, States } from './stateReducer';


type MoveAction = Action<'MoveAction'> & {
  direction: DIRECTION,
}


type RestartGameAction = Action<'RestartGameAction'>;

type TogglePauseGame = Action<'TogglePauseGame'>;

type GravityAction = Action<'GravityAction'> & {
  seed: number,
};

type SaveGameAction = Action<'SaveGameAction'>;

type LoadGameAction = Action<'LoadGameAction'>;

type LoadHighScoreAction = Action<'LoadHighScoreAction'>;

export type Actions =
  MoveAction
  | RestartGameAction
  | TogglePauseGame
  | GravityAction
  | SaveGameAction
  | LoadGameAction
  | LoadHighScoreAction;


export const reducer = generateReducer<States, Actions>({
  'MoveAction': ({state, action: {direction}}) =>
    (
      Object.keys(mainState(state).currentShapeLocation).length === 0 ||
      (
        mainState(state).paused &&
        // don't cheat :_)
        direction !== DIRECTION.DOWN
      )
    ) ?
      state:
      updateBoard(
        mainState(state),
        moveShape(
          mainState(state).currentShapeLocation,
          direction,
          mainState(state).paused ?
            -1 :
            1
        ),
      ),
  'RestartGameAction': ({state}) =>
    getInitialState(state.bestScore),
  'TogglePauseGame': ({state}) => (
    {
      ...mainState(state),
      paused: !mainState(state).paused,
    }
  ),
  'GravityAction': ({state: initialState, action: {seed}}) => {
    const state = mainState(initialState);

    if (state.paused)
      return state;

    const shapeNames = Object.entries(SHAPES).filter(([, {spawn}]) =>
      spawn,
    ).map(([shapeName]) =>
      shapeName,
    );

    const nextShape = state.nextShape === '_' ?
      shapeNames[seed % shapeNames.length] :
      state.nextShape;

    const newState: MainState = {
      ...state,
      nextShape,
    };

    return Object.keys(newState.currentShapeLocation).length === 0 ?
      // spawn new shape
      spawnNewShape(newState) :
      // move current shape down
      updateBoard(
        newState,
        moveShape(
          newState.currentShapeLocation,
          DIRECTION.DOWN,
        ),
      );
  },
  'SaveGameAction': ({state}) => {
    localStorage.setItem('state', JSON.stringify(state));
    return state;
  },
  'LoadGameAction': ({state}) => localStorage.getItem('state') ?
    JSON.parse(localStorage.getItem('state')!) :
    state,
  'LoadHighScoreAction': ({state, action: {highScore})=>({
    ...state,
    bestScore: highScore
  }),
});
