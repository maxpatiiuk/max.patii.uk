import type { GetStaticPaths } from 'next';
import Head from 'next/head';
import React from 'react';

import { icons } from '../../components/icons';
import Layout from '../../components/Layout';
import { localization } from '../../const/localization';
import { projects } from '../../const/projects';
import type { RA } from '../../lib/utilities';

type ProjectIdQuery = {
  readonly id: keyof typeof projects;
};

export default function ProjectPage({ id }: ProjectIdQuery): JSX.Element {
  const project = projects[id];
  const ogImage = Array.from(
    project.content.props.children as RA<JSX.Element>
  ).find(
    (element) =>
      typeof element === 'object' &&
      typeof element.props.source?.src === 'string'
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
  const baseUrl =
    typeof process.env.VERCEL_URL === 'string'
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000';
  return (
    <Layout title={project.title} useDefaultDescription={false}>
      <div className="min-h-screen text-white bg-black">
        <Head>
          <meta property="og:title" content={project.title} />
          <meta name="description" content={project.description} />
          <meta property="og:description" content={project.description} />
          {typeof ogImage === 'object' && (
            <>
              <meta
                property="og:image"
                content={`${baseUrl}${ogImage.source.src}`}
              />
              <meta property="og:image:alt" content={ogImage.children} />
              <meta
                property="og:image:width"
                content={`${ogImage.source.width}`}
              />
              <meta
                property="og:image:height"
                content={`${ogImage.source.height}`}
              />
            </>
          )}
        </Head>
        <header className="flex h-48 bg-gray-800 justify-center">
          <div className="gap-y-3 w-full max-w-[1000px] flex flex-col p-4 md:px-0 justify-center">
            <a className="hover:text-white w-full text-gray-300 flex" href="/">
              {icons.chevronLeft}
              {localization.returnToHomePage}
            </a>
            <div className="flex-1 flex flex-col justify-center text-center">
              <h1 className="w-full text-3xl">{project.title}</h1>
              {typeof project.gitHub === 'string' && (
                <a
                  className="hover:text-white w-full text-gray-300"
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
      </div>
    </Layout>
  );
}

export function getStaticProps({
  params,
}: {
  readonly params: ProjectIdQuery;
}): { readonly props: ProjectIdQuery } {
  return { props: params };
}

export const getStaticPaths: GetStaticPaths<ProjectIdQuery> =
  function getStaticPaths() {
    return {
      paths: Object.keys(projects).map((id) => ({ params: { id } })),
      fallback: false,
    };
  };
