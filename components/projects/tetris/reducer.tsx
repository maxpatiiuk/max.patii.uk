/*
* Action's reducer
* */

import { SHAPES } from '../../../const/projects/tetris/config';
import { DIRECTION } from '../../../lib/projects/tetris/definitions';
import {
  moveShapeOnTheBoard,
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

export type Actions =
  MoveAction
  | RestartGameAction
  | TogglePauseGame
  | GravityAction;


export const reducer = generateReducer<States, Actions>({
  'MoveAction': ({state, action: {direction}}) =>
    moveShapeOnTheBoard(
      mainState(state),
      direction,
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

    return Object.keys(state.currentShapeLocation).length === 0 ?
      // spawn new shape
      spawnNewShape(newState) :
      // move current shape down
      moveShapeOnTheBoard(
        newState,
        DIRECTION.DOWN,
      );
  },
});
