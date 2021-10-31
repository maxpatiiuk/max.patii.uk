import React from 'react';

import { SnowCrash } from '../../../../components/projects/canvas/snow-crash';

export default function Binary(): JSX.Element {
  return (
    <SnowCrash
      colorGenerator={(): number => (Math.random() >= 0.5 ? 255 : 0)}
      monochrome
    />
  );
}
