/*
* Configurations for the game
* */

// board size horizontal
// NOTE: if you change this, you also need to change the className for the
// main grid component from `grid-cols-10` to the new value
export const BOARD_X = 10;

// board size vertical
export const BOARD_Y = 20;

// the speed at which the game ticks / the gravity acts / the block fall
export const SPEED = 1000;

// shapes to use in the game, their colors and definitions
export const SHAPES: Readonly<Record<string, {
  color: string,
  definition: ReadonlyArray<ReadonlyArray<'0' | '1'>>
}>> = {
  I: {
    color: '#0ff',  // Cyan
    definition: [
      ['1'],
      ['1'],
      ['1'],
      ['1'],
    ],
  },
  O: {
    color: '#ff0',  // Yellow
    definition: [
      ['1', '1'],
      ['1', '1'],
    ],
  },
  T: {
    color: '#f0f',  // Purple
    definition: [
      ['1', '0'],
      ['1', '1'],
      ['1', '0'],
    ],
  },
  S: {
    color: '#0f0',  // Green
    definition: [
      ['0', '1', '1'],
      ['1', '1', '0'],
    ],
  },
  J: {
    color: '#00f',  // Blue
    definition: [
      ['1', '0', '0'],
      ['1', '1', '1'],
    ],
  },
  Z: {
    color: '#f00',  // Red
    definition: [
      ['1', '1', '0'],
      ['0', '1', '1'],
    ],
  },
  L: {
    color: '#ffa500',  // Orange
    definition: [
      ['1', '0'],
      ['1', '0'],
      ['1', '1'],
    ],
  },
  _: {  // Empty Cell
    color: '#000', // Black
    definition: [],
  },
} as const;