import { h } from '@arcgis/lumina';
import type { JsxNode } from '@arcgis/lumina';
import type { PostPageMetadata, SeriesNames } from './mp-post-layout';

export function resolveSeries(
  seriesName: NonNullable<PostPageMetadata['seriesName']>,
  seriesSource: PostPageMetadata['seriesSource'],
  currentPage: PostPageMetadata,
): SeriesEntry[] {
  const entries: SeriesEntry[] = [];
  for (const [slug, page] of Object.entries(seriesSource!.pages)) {
    if (page.seriesName === seriesName) {
      entries.push({
        collectionName: seriesSource!.collectionName,
        slug,
        title: page.title,
        isCurrent: page === currentPage,
      });
    }
  }
  return entries.reverse();
}
interface SeriesEntry {
  collectionName: string;
  slug: string;
  title: string;
  isCurrent?: boolean;
}

export function Series({
  series,
  seriesName,
}: {
  series: SeriesEntry[];
  seriesName: keyof SeriesNames;
}): JsxNode {
  const heading = `Part of a series: ${seriesName}`;
  return (
    <nav aria-label={heading}>
      <h2>{heading}</h2>
      <ol>
        {series.map(({ collectionName, slug, title, isCurrent }) => (
          <li>
            {isCurrent ? (
              <span aria-current="page">{title}</span>
            ) : (
              <a href={`/${collectionName}/${slug}`}>{title}</a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
