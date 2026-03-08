import { h, Fragment } from '@arcgis/lumina';
import type { TemplateResult } from 'lit';

export function VideoPlayer({
  caption,
  src,
}: {
  caption: string;
  src: string;
}): TemplateResult {
  return (
    <>
      <h2>{caption}</h2>
      <p>
        <slot name="description" />
      </p>
      <div>
        <iframe
          width="640"
          height="360"
          title={caption}
          src={src}
          allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        />
      </div>
    </>
  );
}
