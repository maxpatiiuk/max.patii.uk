import type {
  AvailableLanguages,
  LanguageStringsStructure,
} from '../../../lib/languages';
import type { RA } from '../../../lib/utilities';

const languageStrings: LanguageStringsStructure<{
  title: string;
  learningObjectives: string;
  demonstratedAchievements: string;
  spotlight: string;
}> = {
  'en-US': {
    title: 'SDE Intern at Amazon',
    learningObjectives: 'Learning Objectives',
    demonstratedAchievements: 'Demonstrated Achievements',
    spotlight: 'Spotlight',
  },
};

const links: RA<{
  readonly key: keyof typeof languageStrings[AvailableLanguages['type']];
  readonly url: string;
}> = [
  { key: 'learningObjectives', url: '/projects/learning-objectives' },
  {
    key: 'demonstratedAchievements',
    url: '/projects/demonstrated-achievements',
  },
  { key: 'spotlight', url: '/projects/spotlight' },
] as const;

export function InternMenu({
  language,
}: {
  readonly language: AvailableLanguages['type'];
}): JSX.Element {
  return (
    <>
      <p className="text-3xl text-gray-400">
        {languageStrings[language].title}
      </p>
      <nav className="flex flex-col">
        {links.map(({ key, url }) => (
          <a
            key={key}
            href={url}
            rel="noopener"
            className="hover:text-gray-500 py-1"
          >
            {languageStrings[language][key]}
          </a>
        ))}
      </nav>
    </>
  );
}
