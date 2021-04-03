/*
* React components
* */

import React from 'react';
import { SHAPES } from '../../../const/projects/tetris/config';
import { namedComponent } from '../../../lib/stateManagement';

export const Cell = namedComponent(
  React.memo(
    ({
      color,
    }: {
      color: typeof SHAPES[string]['color']
    })=><div
      style={{
        backgroundColor: color,
      }}
    />
  ),
  'Cell'
);

export const fancyButtonStyles = 'bg-white hover:bg-gray-600 mt-6 p-5' +
  ' text-black disabled:bg-gray-400 disabled:cursor-not-allowed';
