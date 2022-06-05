import Link from 'next/link';

import { projects } from '../const/projects/projects';
import siteInfo from '../const/siteInfo';
import type { LanguageStringsStructure } from '../lib/languages';
import type { RA } from '../lib/utilities';
import Layout from './Layout';
import { InternMenu } from './projects/internship/Menu';

const links: RA<{ readonly label: string; readonly url: string }> = [
  { label: 'max@patii.uk', url: 'mailto:max@patii.uk' },
  { label: 'linkedin', url: 'https://linkedin.patii.uk' },
  { label: 'github', url: 'https://github.patii.uk' },
  { label: 'twitter', url: 'https://twitter.patii.uk' },
  { label: 'instagram', url: 'https://instagram.patii.uk' },
  { label: 'cv', url: 'https://cv.patii.uk' },
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

export default function MainPage({
  withInternshipDetails = false,
}: {
  readonly withInternshipDetails?: boolean;
}): JSX.Element {
  return (
    <Layout>
      {(language): JSX.Element => (
        <div
          className={`min-h-screen flex flex-col lg:flex-row justify-center
            bg-black text-white`}
        >
          <header>
            <div
              className={`lg:min-h-screen gap-y-10 flex flex-col
                justify-between sticky top-0 p-20`}
            >
              <div className="gap-y-4 flex flex-col">
                <h1 className="text-7xl">{siteInfo[language].author}</h1>
                {withInternshipDetails ? (
                  <InternMenu language={language} />
                ) : (
                  <p className="text-3xl text-gray-400">
                    {languageStrings[language].title}
                  </p>
                )}
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
            </div>
          </header>
          <main className="gap-y-10 lg:pt-20 flex flex-col p-20 pt-0">
            <h2 className="text-3xl">{languageStrings[language].myProjects}</h2>
            {Object.entries(projects)
              .filter(([_id, { gitHub }]) => typeof gitHub === 'string')
              .map(([id, { localized }]) => (
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
