import Head                   from 'next/head';
import React                  from 'react';
import LanguageContext        from './LanguageContext';
import siteInfo               from '../const/siteInfo';
import { robots, themeColor } from '../const/siteConfig';
import { AvailableLanguages, LanguageStringsStructure } from '../lib/languages';

function extractTitle(
  language: AvailableLanguages['type'],
  title:
    string
    | LanguageStringsStructure<{
      title: string,
    }>
    | ((string:AvailableLanguages['type'])=>string),
): string {

  if (title === '')
    return siteInfo[language].title;

  const titleString = typeof title === 'object' ?
    title[language].title :
    typeof title === 'function' ?
      title(language) :
      title;

  return titleString.substr(-1) === ' ' ?
    `${titleString}- ${siteInfo[language].title}` :
    titleString;
}


const Layout = ({
  title = '',
  children,
  private_page = false,
}: {
  title?:
    string
    | LanguageStringsStructure<{
      title: string,
    }>
    | ((string:AvailableLanguages['type'])=>string),
  children: (language: AvailableLanguages['type']) => React.ReactNode,
  private_page?: boolean
}) =>
  <LanguageContext.Consumer>
    {(language) =>
      <>
        <Head>
          <title>{extractTitle(language, title)}</title>
          <link rel='icon' href='/favicon.ico' />
          <meta name='robots' content={
            private_page ? 'noindex,nofollow' : robots
          } />
          <meta name='description' content={
            siteInfo[language].description
          } />
          <meta name='keywords' content={
            siteInfo[language].keywords
          } />
          <meta name='author' content={siteInfo[language].author} />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/icons/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png" sizes="32x32"
            href="/icons/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/icons/favicon-16x16.png"
          />
          <link
            rel="manifest"
            href="/site.webmanifest"
          />
          <link
            rel="mask-icon"
            href="/icons/safari-pinned-tab.svg"
            color={themeColor}
          />
          <meta name="msapplication-TileColor" content={themeColor} />
          <meta name="theme-color" content={themeColor} />
        </Head>
        <div id='root'>
          {children(language)}
        </div>
      </>
    }
  </LanguageContext.Consumer>;

export default Layout;