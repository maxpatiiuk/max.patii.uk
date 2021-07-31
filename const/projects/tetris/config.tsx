/*
 * Configurations for the game
 *
 */

/*
 * Board size horizontal
 * NOTE: if you change this, you also need to change the className for the
 * main grid component from `grid-cols-10` to the new value
 */
import type { IR } from '../../../lib/utilities';

export const BOARD_X = 10;

// Board size vertical
export const BOARD_Y = 20;

// The speed at which the game ticks / the gravity acts / the blocks fall
export const INITIAL_SPEED = 1000;

// How many points to give for each competed row
export const SCORE_MULTIPLIER = 100;

// Shapes to use in the game, their colors and definitions
/* eslint-disable @typescript-eslint/naming-convention */
export const SHAPES: IR<{
  // What color to use for the shape
  color: string;
  // How does this shape look
  definition: readonly (readonly ('0' | '1')[])[];
  // Whether this shape can be randomly selected
  spawn: boolean;
}> = {
  /* eslint-disable id-length */
  I: {
    // Cyan
    color: '#0ff',
    definition: [['1'], ['1'], ['1'], ['1']],
    spawn: true,
  },
  O: {
    // Blue
    color: '#0af',
    definition: [
      ['1', '1'],
      ['1', '1'],
    ],
    spawn: true,
  },
  T: {
    // Purple
    color: '#f0f',
    definition: [
      ['1', '0'],
      ['1', '1'],
      ['1', '0'],
    ],
    spawn: true,
  },
  S: {
    // Green
    color: '#0f0',
    definition: [
      ['0', '1', '1'],
      ['1', '1', '0'],
    ],
    spawn: true,
  },
  J: {
    // Blue
    color: '#00f',
    definition: [
      ['1', '0', '0'],
      ['1', '1', '1'],
    ],
    spawn: true,
  },
  Z: {
    // Red
    color: '#f00',
    definition: [
      ['1', '1', '0'],
      ['0', '1', '1'],
    ],
    spawn: true,
  },
  L: {
    // Orange
    color: '#ffa500',
    definition: [
      ['1', '0'],
      ['1', '0'],
      ['1', '1'],
    ],
    spawn: true,
  },
  // Empty Cell
  _: {
    // Black
    color: '#000',
    definition: [],
    spawn: false,
  },
  /* eslint-enable @typescript-eslint/naming-convention */
  /* eslint-enable id-length */
} as const;
