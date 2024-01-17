import React from 'react';

import { icons } from '../../../components/Atoms/Icons';
import { localization } from '../../../const/localization';
import { projects } from '../../../const/projects';
import type { RA } from '../../../lib/types';
import { Metadata } from 'next';
import { baseUrl } from '../../../const/siteConfig';
import Link from 'next/link';

type ProjectIdParam = {
  readonly id: keyof typeof projects;
};
type Payload = {
  readonly params: ProjectIdParam;
};

export const generateStaticParams = (): RA<ProjectIdParam> =>
  Object.keys(projects).map((id) => ({ id }));

export const dynamicParams = false;

const linkStyle = 'hover:text-white text-neutral-300 flex gap-2 items-center';

export default function ProjectPage({ params: { id } }: Payload): JSX.Element {
  const project = projects[id];

  return (
    <main
      className={`
        grid grid-cols-[1fr_min(64ch,100%)_1fr] [&>*]:col-start-2
        [&>*]:col-end-2 p-4 sm:p-8 gap-x-0 gap-y-6 pb-16 leading-8
      `}
    >
      <header className="flex flex-col gap-16 pb-4">
        <div className="flex flex-wrap justify-between gap-y-4 gap-x-16">
          <Link className={`${linkStyle} sm:-ml-2`} href="/">
            {icons.chevronLeft}
            {localization.returnToHomePage}
          </Link>
          {typeof project.gitHub === 'string' && (
            <a
              className={`${linkStyle} sm:flex-row-reverse`}
              href={project.gitHub}
            >
              {icons.github}
              {localization.viewOnGitHub}
            </a>
          )}
        </div>
        <hgroup className="flex flex-col gap-2">
          <h1 className="w-full text-4xl font-bold">{project.title}</h1>
          <p className="text-neutral-300 text-lg italic">
            {project.description}
          </p>
        </hgroup>
      </header>
      {project.content}
    </main>
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
