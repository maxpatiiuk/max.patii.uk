import React from 'react';

import { draw } from '../../../lib/projects/canvas/snow-crash';
import Layout from '../../Layout';

function Canvas({
  draw,
  afterResize,
}: {
  draw: { readonly current: () => void };
  afterResize?: (
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D
  ) => void;
}): JSX.Element {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const [isPaused, setIsPaused] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (canvasRef.current === null) return undefined;

    const canvas = canvasRef.current;
    const context = canvasRef.current.getContext('2d');

    if (canvas === null || context === null) return undefined;

    context.imageSmoothingEnabled = false;

    const handleResize = (): void => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      afterResize?.(canvas, context);
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    return (): void => {
      window.removeEventListener('resize', handleResize);
    };
  }, [canvasRef.current]);

  React.useEffect(() => {
    if (canvasRef.current === null || isPaused) return undefined;

    const canvas = canvasRef.current;
    const context = canvasRef.current.getContext('2d');

    if (canvas === null || context === null) return undefined;

    let destructorCalled = false;
    const step = (): void => {
      if (destructorCalled) return;
      draw.current();
      window.requestAnimationFrame(step);
    };
    step();

    return (): void => {
      destructorCalled = true;
    };
  }, [canvasRef.current, draw.current, isPaused]);

  React.useEffect(() => {
    const handleClick = () => setIsPaused((isPaused) => !isPaused);
    window.addEventListener('click', handleClick);
    return (): void => window.removeEventListener('click', handleClick);
  }, []);

  return <Layout>{(): JSX.Element => <canvas ref={canvasRef} />}</Layout>;
}

export function SnowCrash({
  colorGenerator,
  monochrome,
}: {
  colorGenerator: () => number;
  monochrome: boolean;
}): JSX.Element {
  const [binaryDraw, setBinaryDraw] = React.useState<{
    readonly current: () => void;
  }>({
    current: () => {
      // Default
    },
  });

  return (
    <Canvas
      draw={binaryDraw}
      afterResize={(canvas, context): void => {
        setBinaryDraw({
          current: () =>
            draw(
              colorGenerator,
              monochrome,
              context.createImageData(canvas.width, canvas.height),
              context
            ),
        });
      }}
    />
  );
}
