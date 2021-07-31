import type { GetStaticPaths } from 'next';
import Head from 'next/head';
import React from 'react';

import Layout from '../../components/Layout';
import { projects } from '../../const/projects/projects';
import type { LanguageStringsStructure } from '../../lib/languages';

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
  return (
    <Layout title={project.localized}>
      {(language): JSX.Element => (
        <div className="min-h-screen text-white bg-black">
          <Head>
            <meta
              name="description"
              content={project.localized[language].description}
            />
          </Head>
          <header className="flex items-end justify-center h-48 bg-gray-800">
            <div className="gap-y-3 md:w-9/12 flex flex-col p-4 text-center">
              <h1 className="w-full text-3xl">
                {project.localized[language].title}
              </h1>
              <a
                className="hover:text-white w-full text-gray-300"
                href={project.gitHub}
              >
                {languageStrings[language].viewOnGitHub}
              </a>
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
