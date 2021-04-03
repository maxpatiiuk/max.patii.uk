import * as R from 'ramda';
import { MainState } from '../../../components/projects/tetris/stateReducer';
import { DIRECTION } from './definitions';

const inflateShape = (
  flatShape: number[][],
):MainState['currentShapeLocation']=>flatShape.reduce(
  (shape, [row, col])=>({
    ...shape,
    [row]: {
      ...shape[row],
      [col]: true
    }
  }),
  {} as MainState['currentShapeLocation']
);

const transposeFlatShape = (
  flatShape: number[][]
):number[][]=>flatShape.map(([row, col])=>
  [col, row]
);

export const flattenShape = (
  shape:MainState['currentShapeLocation'],
):number[][]=>Object.entries(shape).flatMap(([rowIndex, row])=>
  Object.keys(row).map(colIndex=>
    [parseInt(rowIndex), parseInt(colIndex)]
  )
);

const getShapeOffset = (
  shape:MainState['currentShapeLocation'],
  direction: 'x'|'y',
)=>(
  direction === 'x' ?
    Object.values(shape).flatMap(row=>
      Object.keys(row)
    ) :
    Object.keys(shape)
).map(
  R.unary(parseInt)
).reduce((min, value)=>
    Number.isNaN(min) || value<min ?
      value :
      min,
  NaN
);

const transposeShape = (
  shape:MainState['currentShapeLocation']
):MainState['currentShapeLocation'] => [shape].map(shape=>({
  shape,
  shapeXOffset: getShapeOffset(shape, 'x'),
  shapeYOffset: getShapeOffset(shape, 'y'),
})).map(({shape, shapeXOffset, shapeYOffset})=>
  moveShape(
    moveShape(
      R.compose(
        inflateShape,
        transposeFlatShape,
        flattenShape
      )(
        moveShape(
          moveShape(
            shape,
            // since UP means `rotate`, need to reverse move down here
            DIRECTION.DOWN,
            -shapeYOffset
          ),
          DIRECTION.LEFT,
          shapeXOffset
        )
      ),
      DIRECTION.DOWN,
      shapeYOffset
    ),
    DIRECTION.RIGHT,
    shapeXOffset
  )
)[0];

export const moveShape = (
  currentShapeLocation:MainState['currentShapeLocation'],
  direction:DIRECTION,
  multiplier: number = 1
):MainState['currentShapeLocation'] =>
  direction === DIRECTION.UP ?
    transposeShape(currentShapeLocation) :
    Object.fromEntries(
      Object.entries(currentShapeLocation).map(([rowIndex, row]) =>
        [
          direction === DIRECTION.DOWN ?
            parseInt(rowIndex) + multiplier :
            rowIndex,
          direction === DIRECTION.DOWN ?
            row :
            Object.fromEntries(
              Object.keys(row).map(colIndex=>
                [
                  parseInt(colIndex) + (
                    direction === DIRECTION.RIGHT ?
                      1 :
                      -1
                  ) * multiplier,
                  true
                ]
              )
            ),
        ],
      )
    );
