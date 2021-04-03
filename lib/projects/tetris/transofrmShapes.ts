import * as R from 'ramda';
import { ShapeLocation } from '../../../components/projects/tetris/stateReducer';
import { DIRECTION } from './definitions';

export const flattenShape = (
  shape: ShapeLocation,
): number[][] => Object.entries(shape).flatMap(([rowIndex, row]) =>
  Object.keys(row).map(colIndex =>
    [parseInt(rowIndex), parseInt(colIndex)],
  ),
);

const getShapeSize = (
  shape: ShapeLocation,
  direction: 'x' | 'y',
): number => getMaxArrayValue(
  (
    direction === 'y' ?
      Object.keys(shape) :
      Object.values(shape).flatMap(row =>
        Object.keys(row),
      )
  ).map(value =>
    parseInt(value) + 1,
  ),
);

const matrixToShape = (
  matrix: (0 | 1)[][],
): ShapeLocation => Object.fromEntries(
  matrix.map((row, rowIndex) =>
    [
      rowIndex,
      Object.fromEntries(
        row.map((cell, cellIndex) => (
          {
            cell,
            cellIndex,
          }
        )).filter(({cell}) =>
          cell,
        ).map(({cellIndex}) =>
          [cellIndex, true],
        ),
      ),
    ],
  ).filter(([, row]) =>
    Object.keys(row).length !== 0,
  ),
);

// Adapted from https://stackoverflow.com/a/15171086/8584605
function rotateMatrix<T>(
  matrix: T[][],
) {
  const cells = matrix.flat();
  const rotatedCells: T[] = [];

  cells.forEach((cell, i) => {
    rotatedCells[
    (
      i % matrix.length
    ) * matrix.length
    + matrix.length
    - Math.floor(i / matrix.length) - 1
      ] = cell;
  });

  return R.splitEvery(matrix.length, rotatedCells);
}

const rotateMatrixNTimes = R.curryN(
  2,
  <T>(
    times: number,
    matrix: T[][],
  ) => [...Array(times % 4)].reduce(
    (matrix) =>
      rotateMatrix(matrix),
    matrix,
  ) || matrix,
);

const shapeToMatrix = (
  shape: ShapeLocation,
): (0 | 1)[][] => R.of(shape).map(shape => (
  {
    shape,
    size: R.max(getShapeSize(shape, 'x'), getShapeSize(shape, 'y')),
  }
)).map(({shape, size}) =>
  [...Array(size)].reduce(
    (array, _, rowIndex) =>
      [
        ...array,
        [...Array(size)].reduce(
          (array, _, colIndex) =>
            [
              ...array,
              shape[rowIndex]?.[colIndex] ?
                1 :
                0,
            ],
          [],
        ),
      ],
    [],
  ),
)[0];

const getMaxArrayValue = (
  array: number[],
): number => array.reduce(
  (max, value) =>
    Number.isNaN(max) || value > max ?
      value :
      max,
  NaN,
);

const getMinArrayValue = (
  array: number[],
): number => array.reduce(
  (min, value) =>
    Number.isNaN(min) || value < min ?
      value :
      min,
  NaN,
);

const getShapeOffset = (
  shape: ShapeLocation,
  direction: 'x' | 'y',
) => getMinArrayValue(
  (
    direction === 'x' ?
      Object.values(shape).flatMap(row =>
        Object.keys(row),
      ) :
      Object.keys(shape)
  ).map(
    R.unary(parseInt),
  ),
);

const editShape = (
  shape: ShapeLocation,
  callback: (shape: ShapeLocation) => ShapeLocation,
) => [shape].map(shape => (
  {
    shape,
    shapeXOffset: getShapeOffset(shape, 'x'),
    shapeYOffset: getShapeOffset(shape, 'y'),
  }
)).map(({shape, shapeXOffset, shapeYOffset}) =>
  padShape(
    callback(
      stripShape(
        shape,
        shapeXOffset,
        shapeYOffset,
      ),
    ),
    shapeXOffset,
    shapeYOffset,
  ),
)[0];

const padShape = (
  shape: ShapeLocation,
  xOffset: number,
  yOffset: number,
) => moveShape(
  moveShape(
    shape,
    DIRECTION.DOWN,
    yOffset,
  ),
  DIRECTION.RIGHT,
  xOffset,
);

const autoStripShape = (
  shape: ShapeLocation,
) => stripShape(
  shape,
  getShapeOffset(shape, 'x'),
  getShapeOffset(shape, 'y'),
);

const stripShape = (
  shape: ShapeLocation,
  xOffset: number,
  yOffset: number,
) => moveShape(
  moveShape(
    shape,
    DIRECTION.DOWN,
    -yOffset,
  ),
  DIRECTION.LEFT,
  xOffset,
);

const rotateShape = (
  shape: ShapeLocation,
  multiplier: number = 1,
): ShapeLocation => editShape(
  shape,
  R.compose(
    autoStripShape,
    matrixToShape,
    rotateMatrixNTimes(multiplier),
    shapeToMatrix,
  ),
);

export const moveShape = (
  currentShapeLocation: ShapeLocation,
  direction: DIRECTION,
  multiplier: number = 1,
): ShapeLocation =>
  direction === DIRECTION.UP ?
    rotateShape(
      currentShapeLocation,
      multiplier,
    ) :
    Object.fromEntries(
      Object.entries(currentShapeLocation).map(([rowIndex, row]) =>
        [
          direction === DIRECTION.DOWN ?
            parseInt(rowIndex) + multiplier :
            rowIndex,
          direction === DIRECTION.DOWN ?
            row :
            Object.fromEntries(
              Object.keys(row).map(colIndex =>
                [
                  parseInt(colIndex) + (
                    direction === DIRECTION.RIGHT ?
                      1 :
                      -1
                  ) * multiplier,
                  true,
                ],
              ),
            ),
        ],
      ),
    );
