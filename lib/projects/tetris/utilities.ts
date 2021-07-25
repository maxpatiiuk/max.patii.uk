import type {
  MainState,
  ShapeLocation,
  ShapeLocationWritable,
  States,
} from '../../../components/projects/tetris/stateReducer';
import { gameOverState } from '../../../components/projects/tetris/stateReducer';
import {
  BOARD_X,
  BOARD_Y,
  SCORE_MULTIPLIER,
  SHAPES,
} from '../../../const/projects/tetris/config';
import { flattenShape } from './transofrmShapes';

export function spawnNewShape(state: MainState): States {
  const shapeDefinition = SHAPES[state.nextShape].definition;
  const shapeWidth = shapeDefinition[0].length;
  const shapeOffset = Math.round((BOARD_X - shapeWidth) / 2);

  if (
    state.board.some((row, rowIndex) =>
      row.some(
        (cell, cellIndex) =>
          shapeDefinition[rowIndex]?.[cellIndex - shapeOffset] === '1' &&
          cell !== '_'
      )
    )
  )
    return gameOverState(state);

  const currentShapeLocation: ShapeLocationWritable = {};

  // Probably the most impure function in this entire game
  function updateCurrentShape(rowIndex: number, cellIndex: number) {
    if (!(rowIndex in currentShapeLocation))
      currentShapeLocation[rowIndex] = {};
    if (!(cellIndex in currentShapeLocation[rowIndex]))
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
        shapeDefinition[rowIndex]?.[cellIndex - shapeOffset] === '1'
          ? updateCurrentShape(rowIndex, cellIndex)
          : cell
      )
    ),
  };
}

const findCompletedRows = (board: MainState['board']): number[] =>
  board
    .map((row, index) => ({
      isCompleted: row.every((cell) => cell !== '_'),
      index,
    }))
    .filter(({ isCompleted }) => isCompleted)
    .map(({ index }) => index);

const removeCompletedRows = (
  state: MainState,
  rowsToRemove: number[]
): MainState =>
  rowsToRemove.length === 0
    ? state
    : {
        ...state,
        /*
         * Yes! Score growth exponentially!
         * Though, speed increases as the score grows...
         */
        score: (state.score + SCORE_MULTIPLIER * 2) ^ (rowsToRemove.length - 1),
        board: [
          ...new Array(rowsToRemove.length).fill(new Array(BOARD_X).fill('_')),
          ...state.board.filter((_, index) => !rowsToRemove.includes(index)),
        ],
      };

export function updateBoard(
  state: MainState,
  newShapeLocation: ShapeLocation
): MainState {
  if (flattenShape(newShapeLocation).some(([, x]) => x < 0 || x >= BOARD_X))
    return state;

  return (
    // Shape is at the bottom
    flattenShape(newShapeLocation).some(([y]) => y >= BOARD_Y) ||
      // Shape overlaps with another shape
      state.board.some((row, rowIndex) =>
        row.some(
          (cell, cellIndex) =>
            newShapeLocation[rowIndex]?.[cellIndex] &&
            !state.currentShapeLocation[rowIndex]?.[cellIndex] &&
            cell !== '_'
        )
      )
      ? // Place shape
        removeCompletedRows(
          {
            ...state,
            currentShapeLocation: {},
          },
          findCompletedRows(state.board)
        )
      : // Move shape down
        {
          ...state,
          currentShapeLocation: newShapeLocation,
          board: state.board.map((row, rowIndex) =>
            row.map((cell, cellIndex) =>
              newShapeLocation[rowIndex]?.[cellIndex]
                ? state.currentShape
                : state.currentShapeLocation[rowIndex]?.[cellIndex]
                ? '_'
                : cell
            )
          ),
        }
  );
}
