import Link from 'next/link';

import Layout from '../components/Layout';
import { localization } from '../const/localization';
import { projects } from '../const/projects';
import type { RA } from '../lib/utilities';

const links: RA<{ readonly label: string; readonly url: string }> = [
  { label: 'max@patii.uk', url: 'mailto:max@patii.uk' },
  { label: 'linkedin', url: 'https://linkedin.patii.uk' },
  { label: 'github', url: 'https://github.patii.uk' },
  { label: 'twitter', url: 'https://twitter.patii.uk' },
  { label: 'instagram', url: 'https://instagram.patii.uk' },
  { label: 'youtube', url: 'https://youtube.com/@maxpatiiuk' },
  { label: 'about', url: 'https://doc.patii.uk' },
  { label: 'cv', url: 'https://cv.patii.uk' },
];

export default function MainPage(): JSX.Element {
  return (
    <Layout>
      <div
        className={`
          min-h-screen flex flex-col lg:flex-row justify-center rbg-black
          text-white
        `}
      >
        <header>
          <div
            className={`
              lg:min-h-screen gap-y-10 flex flex-col justify-between sticky
              top-0 p-10 sm:p-20
            `}
          >
            <div className="gap-y-4 flex flex-col">
              <h1 className="text-7xl">{localization.siteAuthor}</h1>
              <p className="text-3xl text-gray-400">
                {localization.siteAuthorTitle}
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
          </div>
        </header>
        <main className="gap-y-10 lg:pt-20 flex flex-col p-10 sm:p-20 pt-0">
          <h2 className="text-3xl">{localization.myProjects}</h2>
          {Object.entries(projects).map(([id, { description, title }]) =>
            typeof description === 'string' ? (
              <article
                key={id}
                className={
                  'bg-white flex flex-col gap-y-3 p-6 rounded-xl text-black'
                }
              >
                <Link href={`/projects/${id}/`}>
                  <h3 className="hover:text-gray-500 text-2xl">{title}</h3>
                </Link>
                <p className="text-xl">{description}</p>
              </article>
            ) : undefined
          )}
        </main>
      </div>
    </Layout>
  );
}
