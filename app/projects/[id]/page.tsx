import React from 'react';

import { icons } from '../../../components/Atoms/Icons';
import { localization } from '../../../const/localization';
import { projects } from '../../../const/projects';
import type { RA } from '../../../lib/types';
import { Metadata } from 'next';
import { baseUrl } from '../../../const/siteConfig';

type ProjectIdParam = {
  readonly id: keyof typeof projects;
};
type Payload = {
  readonly params: ProjectIdParam;
};

export const generateStaticParams = (): RA<ProjectIdParam> =>
  Object.keys(projects).map((id) => ({ id }));

export const dynamicParams = false;

export default function ProjectPage({ params: { id } }: Payload): JSX.Element {
  const project = projects[id];

  return (
    <>
      <header className="flex h-48 bg-neutral-800 justify-center">
        <div className="gap-3 w-full max-w-[1000px] flex flex-col p-4 md:px-0 justify-center">
          <a className="hover:text-white w-full text-neutral-300 flex" href="/">
            {icons.chevronLeft}
            {localization.returnToHomePage}
          </a>
          <div className="flex-1 flex flex-col justify-center text-center">
            <h1 className="w-full text-3xl">{project.title}</h1>
            {typeof project.gitHub === 'string' && (
              <a
                className="hover:text-white w-full text-neutral-300"
                href={project.gitHub}
              >
                {localization.viewOnGitHub}
              </a>
            )}
          </div>
        </div>
      </header>
      <main className="flex justify-center p-4 pt-16 pb-16">
        <div className="max-w-[1000px]">{project.content}</div>
      </main>
    </>
  );
}

export function generateMetadata({ params: { id } }: Payload): Metadata {
  const project = projects[id];

  const ogImage = Array.from(
    project.content.props.children as RA<JSX.Element>,
  ).find(
    (element) =>
      typeof element === 'object' &&
      typeof element.props.source?.src === 'string',
  )?.props as
    | {
        readonly source: {
          readonly src: string;
          readonly width: number;
          readonly height: number;
        };
        readonly children: string;
      }
    | undefined;

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images:
        ogImage === undefined
          ? undefined
          : [
              {
                url: `${baseUrl}${ogImage.source.src}`,
                width: ogImage.source.width,
                height: ogImage.source.height,
                alt: ogImage.children,
              },
            ],
    },
  };
}
