import { LanguageStringsStructure } from '../lib/languages';
import { strip }                    from '../lib/localizationHelper';

const siteInfo: LanguageStringsStructure<{
  title: string,
  description: string,
  keywords: string,
  author: string,
  yes: string,
  no: string,
}> = {
  'en-US': {
    title: 'MAMBO.IN.UA',
    description: strip(`MAMBO.IN.UA - Maksym Patiiuk's personal
      blog`),
    keywords: strip(`Maksym Patiiuk, Maksym Patiiuk blog,
      Maksym Patiiuk CV, Max Patiiuk, Maksym Patiiuk portfolio,
      mambo shop, mambo, В гостях у MAMBO, мамбо,
      mambo experimental, Максим Патіюк`),
    author: 'Maksym Patiiuk',
    yes: 'Yes',
    no: 'No'
  },
};

export default siteInfo;