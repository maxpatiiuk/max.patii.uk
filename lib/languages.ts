import type { Action } from 'typesafe-reducer';

export type AvailableLanguages = Action<'en-US'>;

export type LanguageStringsStructure<
  DEFINITIONS extends Record<string, string | number | Function>
> = {
  readonly [language in AvailableLanguages['type']]: DEFINITIONS;
};
