import Head from 'next/head';
import React from 'react';

import { localization } from '../const/localization';
import { robots, themeColor, twitter } from '../const/siteConfig';

function extractTitle(title: string): string {
  if (title === '') return localization.siteTitle;

  return title.endsWith(' ') ? `${title}- ${localization.siteTitle}` : title;
}

function Layout({
  title = '',
  children,
  privatePage = false,
  manifest = '/site.webmanifest',
  icon,
  props,
  useDefaultDescription = true,
}: {
  readonly title?: string;
  readonly useDefaultDescription?: boolean;
  readonly children: React.ReactNode;
  readonly privatePage?: boolean;
  readonly manifest?: string;
  readonly icon?: string;
  readonly props?: JSX.Element;
}): JSX.Element {
  const fullTitle = extractTitle(title);
  return (
    <>
      <Head>
        <title>{fullTitle}</title>
        <meta property="og:title" content={fullTitle} />
        <link rel="icon" href={icon ?? '/favicon.ico"'} />
        <meta
          name="robots"
          content={privatePage ? 'noindex,nofollow' : robots}
        />
        {useDefaultDescription && (
          <>
            <meta name="description" content={localization.siteDescription} />
            <meta
              property="og:description"
              content={localization.siteDescription}
            />
          </>
        )}
        <meta name="keywords" content={localization.siteKeywords} />
        <meta name="twitter:site" content={twitter} />
        <meta name="twitter:card" content="summary_large_image" />
        {typeof icon === 'undefined' && (
          <>
            <link
              rel="apple-touch-icon"
              sizes="180x180"
              href="/icons/apple-touch-icon.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="32x32"
              href="/icons/favicon-32x32.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="16x16"
              href="/icons/favicon-16x16.png"
            />
          </>
        )}
        <link rel="manifest" href={manifest} />
        <link
          rel="mask-icon"
          href="/icons/safari-pinned-tab.svg"
          color={themeColor}
        />
        <meta name="msapplication-TileColor" content={themeColor} />
        <meta name="theme-color" content={themeColor} />
        {props}
      </Head>
      <div id="root">{children}</div>
    </>
  );
}

export default Layout;
