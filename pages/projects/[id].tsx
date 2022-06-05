import type { GetStaticPaths } from 'next';
import Head from 'next/head';
import React from 'react';

import Layout from '../../components/Layout';
import { projects } from '../../const/projects/projects';
import type { LanguageStringsStructure } from '../../lib/languages';
import type { RA } from '../../lib/utilities';

type ProjectIdQuery = {
  readonly id: keyof typeof projects;
};

const languageStrings: LanguageStringsStructure<{
  viewOnGitHub: string;
}> = {
  'en-US': {
    viewOnGitHub: 'View this project on GitHub',
  },
};

export default function ProjectPage({ id }: ProjectIdQuery): JSX.Element {
  const project = projects[id];
  const ogImage = Array.from(
    project.localized['en-US'].content.props.children as RA<JSX.Element>
  ).find((element) => typeof element.props.source?.src === 'string')?.props as
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
    <Layout title={project.localized} useDefaultDescription={false}>
      {(language): JSX.Element => (
        <div className="min-h-screen text-white bg-black">
          <Head>
            <meta
              property="og:title"
              content={project.localized[language].title}
            />
            <meta
              name="description"
              content={project.localized[language].description}
            />
            <meta
              property="og:description"
              content={project.localized[language].description}
            />
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
          <header className="flex items-end justify-center h-48 bg-gray-800">
            <div className="gap-y-3 md:w-9/12 flex flex-col p-4 text-center">
              <h1 className="w-full text-3xl">
                {project.localized[language].title}
              </h1>
              {typeof project.gitHub === 'string' && (
                <a
                  className="hover:text-white w-full text-gray-300"
                  href={project.gitHub}
                >
                  {languageStrings[language].viewOnGitHub}
                </a>
              )}
            </div>
          </header>
          <main className="flex justify-center p-4 pt-16 pb-16">
            <div className="md:w-9/12">
              {project.localized[language].content}
            </div>
          </main>
        </div>
      )}
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
