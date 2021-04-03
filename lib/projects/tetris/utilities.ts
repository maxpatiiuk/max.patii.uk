import {
  gameOverState,
  MainState,
  States,
} from '../../../components/projects/tetris/stateReducer';
import {
  BOARD_X,
  BOARD_Y,
  SHAPES,
} from '../../../const/projects/tetris/config';
import { DIRECTION } from './definitions';
import { flattenShape, moveShape } from './transofrmShapes';


export function spawnNewShape(
  state: MainState,
): States {

  const shapeDefinition = SHAPES[state.nextShape].definition;
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

  let currentShapeLocation: MainState['currentShapeLocation'] = {};

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

    return state.nextShape;
  }

  return {
    ...state,
    currentShape: state.nextShape,
    nextShape: '_',
    currentShapeLocation,
    board: state.board.map((row, rowIndex) =>
      row.map((cell, cellIndex) =>
        shapeDefinition[rowIndex]?.[cellIndex - shapeOffset] === '1' ?
          updateCurrentShape(rowIndex, cellIndex) :
          cell,
      ),
    ),
  };
}

export function moveShapeOnTheBoard(
  state: MainState,
  direction: DIRECTION,
  multiplier: number = 1,
): MainState {
  let currentShapeLocation: MainState['currentShapeLocation'] =
    state.currentShapeLocation;
  const newShapeLocation = moveShape(
    state.currentShapeLocation,
    direction,
    multiplier,
  );

  //TODO: figure out rotation
  //TODO: forbid going beyond the page

  return (
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
  ) ?
    // place shape
    {
      ...state,
      currentShapeLocation: {},
    } :
    // move shape down
    {
      ...state,
      board: state.board.map((row, rowIndex) =>
        row.map((cell, cellIndex) =>
          newShapeLocation[rowIndex]?.[cellIndex] ?
            state.currentShape :
            currentShapeLocation[rowIndex]?.[cellIndex] ?
              '_' :
              cell,
        )
      )
    };
}