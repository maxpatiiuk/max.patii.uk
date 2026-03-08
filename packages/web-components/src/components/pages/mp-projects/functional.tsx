import type { JsxNode } from '@arcgis/lumina';
import type { ProjectsPageMetadata } from './mp-projects';
import { h } from '@arcgis/lumina';

export function ProjectList({
  projects,
}: Pick<ProjectsPageMetadata, 'projects'>): JsxNode {
  return Object.entries(projects).map(([id, metadata]) =>
    metadata.description === undefined ? (
      ''
    ) : (
      <article>
        <a href={`/projects/${id}/`}>
          <h3>{metadata.title}</h3>
        </a>
        <p>{metadata.description}</p>
      </article>
    ),
  );
}
