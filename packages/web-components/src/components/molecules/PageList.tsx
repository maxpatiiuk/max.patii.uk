import type { JsxNode } from '@arcgis/lumina';
import { h } from '@arcgis/lumina';
import type { PostPageMetadata } from '../layouts/mp-post-layout/mp-post-layout';
import { Time } from '../atoms/time';

export function PageList({
  pages,
  prefix,
}: {
  pages: Record<string, PostPageMetadata>;
  prefix: string;
}): JsxNode {
  return Object.entries(pages).map(([id, metadata]) =>
    metadata.kind === 'index' ? undefined : (
      <article>
        <a href={metadata.externalUrl ?? `/${prefix}/${id}/`}>
          <h3>{metadata.title}</h3>
        </a>
        {metadata.description !== undefined || metadata.date !== undefined ? (
          <p>
            {metadata.date !== undefined && <Time date={metadata.date} />}
            {metadata.date !== undefined && metadata.description !== undefined
              ? ' · '
              : ''}
            {metadata.description}
          </p>
        ) : undefined}
      </article>
    ),
  );
}
