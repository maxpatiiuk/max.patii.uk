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

type OgImage = {
  readonly src: string;
  readonly label: string;
};

export const OgImageContext = React.createContext<
  ((ogImage: OgImage | undefined) => void) | undefined
>(undefined);
OgImageContext.displayName = 'OpImageContext';

export default function ProjectPage({ id }: ProjectIdQuery): JSX.Element {
  const project = projects[id];
  const [ogImage, setOgImage] = React.useState<OgImage | undefined>(undefined);
  const hasOgImage = React.useRef(false);
  return (
    <Layout title={project.localized}>
      {(language): JSX.Element => (
        <div className="min-h-screen text-white bg-black">
          <Head>
            <meta name="og:title" content={project.localized[language].title} />
            <meta
              name="description"
              content={project.localized[language].description}
            />
            <meta
              name="og:description"
              content={project.localized[language].description}
            />
            {typeof ogImage === 'object' && (
              <>
                <meta name="og:image" content={ogImage.src} />
                <meta name="twitter:image" content={ogImage.src} />
                <meta name="twitter:image:alt" content={ogImage.label} />
              </>
            )}
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
              <OgImageContext.Provider
                value={(newOgImage): void => {
                  if (hasOgImage.current) return;
                  setOgImage(newOgImage);
                  hasOgImage.current = true;
                }}
              >
                {project.localized[language].content}
              </OgImageContext.Provider>
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
