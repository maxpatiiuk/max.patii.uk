/*
* Configurations for the game
* */

// board size horizontal
// NOTE: if you change this, you also need to change the className for the
// main grid component from `grid-cols-10` to the new value
export const BOARD_X = 10;

// board size vertical
export const BOARD_Y = 20;

// the speed at which the game ticks / the gravity acts / the blocks fall
export const INITIAL_SPEED = 1000;

// how many points to give for each competed row
export const SCORE_MULTIPLIER = 100;

// shapes to use in the game, their colors and definitions
export const SHAPES: Readonly<Record<string, {
  // what color to use for the shape
  color: string,
  // how does this shape look
  definition: ReadonlyArray<ReadonlyArray<'0' | '1'>>,
  // whether this shape can be randomly selected
  spawn: boolean,
}>> = {
  I: {
    color: '#0ff',  // Cyan
    definition: [
      ['1'],
      ['1'],
      ['1'],
      ['1'],
    ],
    spawn: true,
  },
  O: {
    color: '#0af',  // Blue
    definition: [
      ['1', '1'],
      ['1', '1'],
    ],
    spawn: true,
  },
  T: {
    color: '#f0f',  // Purple
    definition: [
      ['1', '0'],
      ['1', '1'],
      ['1', '0'],
    ],
    spawn: true,
  },
  S: {
    color: '#0f0',  // Green
    definition: [
      ['0', '1', '1'],
      ['1', '1', '0'],
    ],
    spawn: true,
  },
  J: {
    color: '#00f',  // Blue
    definition: [
      ['1', '0', '0'],
      ['1', '1', '1'],
    ],
    spawn: true,
  },
  Z: {
    color: '#f00',  // Red
    definition: [
      ['1', '1', '0'],
      ['0', '1', '1'],
    ],
    spawn: true,
  },
  L: {
    color: '#ffa500',  // Orange
    definition: [
      ['1', '0'],
      ['1', '0'],
      ['1', '1'],
    ],
    spawn: true,
  },
  _: {  // Empty Cell
    color: '#000', // Black
    definition: [],
    spawn: false,
  },
} as const;
