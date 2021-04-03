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