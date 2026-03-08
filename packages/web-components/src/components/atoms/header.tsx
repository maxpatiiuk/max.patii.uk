import { h, type JsxNode } from '@arcgis/lumina';
import { chevronLeftSvg } from './icons';
import type { TemplateResult } from 'lit';

export function Header({
  title,
  children,
  description,
}: {
  title: string;
  children?: JsxNode;
  description?: JsxNode;
}): TemplateResult {
  return (
    <header>
      <nav>{children}</nav>
      <hgroup>
        <h1>{title}</h1>
        {description}
      </hgroup>
    </header>
  );
}

export const returnToHomepage = (
  <a href="/">{chevronLeftSvg} Return to homepage</a>
);

export const returnToProjects = (
  <a href="/projects">{chevronLeftSvg} Return to projects lists</a>
);
