/*
 * React components
 */

import React from 'react';

import type { SHAPES } from '../../../const/projects/tetris/config';

export function Cell({
  color,
}: {
  readonly color: typeof SHAPES[string]['color'];
}): JSX.Element {
  return (
    <div
      style={{
        backgroundColor: color,
      }}
    />
  );
}

export const fancyButtonStyles =
  'bg-white hover:bg-gray-600 mt-6 p-5' +
  ' text-black disabled:bg-gray-400 disabled:cursor-not-allowed';
