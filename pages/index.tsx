import Link from 'next/link';

import Layout from '../components/Layout';
import { projects } from '../const/projects/projects';
import siteInfo from '../const/siteInfo';
import type { LanguageStringsStructure } from '../lib/languages';
import type { RA } from '../lib/utilities';

const links: RA<{ readonly label: string; readonly url: string }> = [
  { label: 'max@patii.uk', url: 'mailto:max@patii.uk' },
  { label: 'linkedin', url: 'https://linkedin.patii.uk' },
  { label: 'github', url: 'https://github.patii.uk' },
  { label: 'twitter', url: 'https://twitter.patii.uk' },
  { label: 'instagram', url: 'https://instagram.patii.uk' },
];

const languageStrings: LanguageStringsStructure<{
  title: string;
  myProjects: string;
}> = {
  'en-US': {
    title: 'Full Stack Web Developer',
    myProjects: 'My projects',
  },
};

export default function index(): JSX.Element {
  return (
    <Layout>
      {(language): JSX.Element => (
        <div
          className={`min-h-screen lg:h-screen w-screen flex flex-col
            lg:flex-row justify-center bg-black text-white`}
        >
          <header className="gap-y-10 flex flex-col justify-between p-20">
            <div className="gap-y-4 flex flex-col">
              <h1 className="text-7xl">{siteInfo[language].author}</h1>
              <p className="text-3xl text-gray-400">
                {languageStrings[language].title}
              </p>
            </div>
            <nav className="flex flex-col">
              {links.map(({ label, url }) => (
                <a
                  key={label}
                  href={url}
                  rel="noopener"
                  className="hover:text-gray-500 py-1"
                >
                  {label}
                </a>
              ))}
            </nav>
          </header>
          <main className="gap-y-10 flex flex-col p-20 overflow-y-scroll">
            <h2 className="text-3xl">{languageStrings[language].myProjects}</h2>
            {Object.entries(projects).map(([id, { localized }]) => (
              <article
                key={id}
                className={
                  'bg-white flex flex-col gap-y-3 p-6 rounded-xl text-black'
                }
              >
                <Link href={`/projects/${id}/`}>
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <a>
                    <h3 className="hover:text-gray-500 text-2xl">
                      {localized[language].title}
                    </h3>
                  </a>
                </Link>
                <p className="text-xl">{localized[language].description}</p>
              </article>
            ))}
          </main>
        </div>
      )}
    </Layout>
  );
}
