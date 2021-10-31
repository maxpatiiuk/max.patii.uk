import React from 'react';

import { SnowCrash } from '../../../../components/projects/canvas/snow-crash';

export default function Grayscale(): JSX.Element {
  return (
    <SnowCrash
      colorGenerator={(): number => Math.floor(Math.random() * 256)}
      monochrome={false}
    />
  );
}
