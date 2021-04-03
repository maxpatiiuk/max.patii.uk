/*
* Action's reducer
* */

import { SHAPES } from '../../../const/projects/tetris/config';
import { DIRECTION } from '../../../lib/projects/tetris/definitions';
import { moveShape } from '../../../lib/projects/tetris/transofrmShapes';
import {
  updateBoard,
  spawnNewShape,
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

export type Actions =
  MoveAction
  | RestartGameAction
  | TogglePauseGame
  | GravityAction
  | SaveGameAction
  | LoadGameAction;


export const reducer = generateReducer<States, Actions>({
  'MoveAction': ({state, action: {direction}}) =>
    updateBoard(
      mainState(state),
      moveShape(
        mainState(state).currentShapeLocation,
        direction,
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
});
