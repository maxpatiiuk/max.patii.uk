/*
* React components
* */

import React from 'react';
import { SHAPES } from '../../../const/projects/tetris/config';

export function Cell({
  color,
}: {
  color: typeof SHAPES[string]['color']
}) {
  return <div
    style={{
      backgroundColor: color,
    }}
  />;
}