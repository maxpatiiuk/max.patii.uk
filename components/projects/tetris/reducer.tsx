/*
* Action's reducer
* */

import {
  BOARD_X,
  BOARD_Y,
  SHAPES,
} from '../../../const/projects/tetris/config';
import { DIRECTION } from '../../../lib/projects/tetris/definitions';
import { Action, generateReducer } from '../../../lib/stateManagement';
import {
  gameOverState,
  getInitialState,
  MainState,
  mainState,
  States,
} from './stateReducer';


type MoveAction = Action<'MoveAction'> & {
  direction: DIRECTION,
}

type SpawnRandomShapeAction = Action<'SpawnRandomShapeAction'>;

type RestartGameAction = Action<'RestartGameAction'>;

type TogglePauseGame = Action<'TogglePauseGame'>;

type GravityAction = Action<'GravityAction'> & {
  seed: number,
};

export type Actions =
  MoveAction
  | SpawnRandomShapeAction
  | RestartGameAction
  | TogglePauseGame
  | GravityAction;


export const reducer = generateReducer<States, Actions>({
  'MoveAction': ({state: initialState /*action*/}) => {
    const state = mainState(initialState);

    //TODO: finish this
    //TODO: work on rotate too
    return state;
  },
  'SpawnRandomShapeAction': ({state: initialState}) => {
    const state = mainState(initialState);

    //TODO: finish this
    return state;
  },
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
    let board: MainState['board'];
    let currentShapeLocation: MainState['currentShapeLocation'] =
      state.currentShapeLocation;
    const shapeNames = Object.keys(SHAPES).filter(shapeName => shapeName !== '_');
    let nextShape = state.nextShape;
    let currentShape = state.currentShape;

    if (state.nextShape === '_')
      nextShape = shapeNames[seed % shapeNames.length];

    if (Object.keys(state.currentShapeLocation).length === 0) {
      const shapeDefinition = SHAPES[nextShape].definition;
      const shapeWidth = shapeDefinition[0].length;
      const shapeOffset = Math.round((
        BOARD_X - shapeWidth
      ) / 2);

      if (
        state.board.some((row, rowIndex) =>
          row.some((cell, cellIndex) =>
            shapeDefinition[rowIndex]?.[cellIndex - shapeOffset] === '1' &&
            cell !== '_',
          ),
        )
      )
        return gameOverState(state);

      function updateCurrentShape(rowIndex: number, cellIndex: number) {

        if (!currentShapeLocation)
          currentShapeLocation = {};
        if (!(
          rowIndex in currentShapeLocation
        ))
          currentShapeLocation[rowIndex] = {};
        if (!(
          cellIndex in currentShapeLocation[rowIndex]
        ))
          currentShapeLocation[rowIndex][cellIndex] = true;

        return nextShape;
      }

      board = state.board.map((row, rowIndex) =>
        row.map((cell, cellIndex) =>
          shapeDefinition[rowIndex]?.[cellIndex - shapeOffset] === '1' ?
            updateCurrentShape(rowIndex, cellIndex) :
            cell,
        ),
      );

      currentShape = nextShape;
      nextShape = '_';
    }
    else {

      const newShapeLocation = Object.fromEntries(
        Object.entries(state.currentShapeLocation).map(([rowIndex, row]) =>
          [
            (
              parseInt(rowIndex) + 1
            ).toString().toString(),
            row,
          ],
        )) as Record<number, Record<number, true>>;
      if (
        Object.keys(newShapeLocation).some(rowIndex =>
          parseInt(rowIndex) >= BOARD_Y,
        ) ||
        state.board.some((row, rowIndex) =>
          row.some((cell, cellIndex) =>
            newShapeLocation[rowIndex]?.[cellIndex] &&
            !currentShapeLocation[rowIndex]?.[cellIndex] &&
            cell !== '_',
          ),
        )
      ) {
        currentShapeLocation = {};
        board = state.board;
      }

      else {
        board = state.board.map((row, rowIndex) =>
          row.map((cell, cellIndex) =>
            newShapeLocation[rowIndex]?.[cellIndex] ?
              state.currentShape :
              currentShapeLocation[rowIndex]?.[cellIndex] ?
                '_' :
                cell,
          ),
        );
        currentShapeLocation = newShapeLocation;
      }
    }

    return {
      ...state,
      board,
      currentShapeLocation,
      currentShape,
      nextShape,
    };
  },
});
