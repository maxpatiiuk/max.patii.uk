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
  { label: 'books', url: 'https://books.patii.uk' },
  { label: 'blog', url: 'https://blog.patii.uk' },
  { label: 'about', url: 'https://doc.patii.uk' },
  { label: 'cv', url: 'https://cv.patii.uk' },
];

export default function MainPage(): JSX.Element {
  return (
    <Layout>
      <div
        className={`
          min-h-screen flex flex-col lg:flex-row justify-center 
        `}
      >
        <header>
          <div
            className={`
              lg:min-h-screen gap-10 flex flex-col justify-between sticky
              top-0 p-10 sm:p-20
            `}
          >
            <hgroup className="gap-4 flex flex-col">
              <h1 className="text-7xl -mt-1">{localization.siteAuthor}</h1>
              <p className="text-3xl text-neutral-400">
                {localization.siteAuthorTitle}
              </p>
            </hgroup>
            <nav>
              <ul className="flex flex-col">
                {links.map(({ label, url }) => (
                  <li key={label} className="contents">
                    <a
                      href={url}
                      rel="noopener"
                      className="hover:text-neutral-500 py-1"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </header>
        <main className="gap-10 lg:pt-20 flex flex-col p-10 sm:p-20 pt-0">
          <h2 className="text-3xl">{localization.myProjects}</h2>
          {Object.entries(projects).map(([id, { description, title }]) =>
            typeof description === 'string' ? (
              <article key={id}>
                <Link href={`/projects/${id}/`}>
                  <h3 className="hover:text-neutral-400 text-2xl pb-1">
                    {title}
                  </h3>
                </Link>
                <p className="text-xl text-neutral-400">{description}</p>
              </article>
            ) : undefined,
          )}
        </main>
      </div>
    </Layout>
  );
}
