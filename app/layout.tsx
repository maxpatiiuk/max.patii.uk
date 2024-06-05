import 'tailwindcss/tailwind.css';

import React from 'react';

import {
  baseUrl,
  googleAnalyticsId,
  robots,
  themeColor,
  twitter,
} from '../const/siteConfig';
import { ClientHooks } from './ClientHooks';
import { Metadata, Viewport } from 'next';
import { localization } from '../const/localization';
import { GoogleAnalytics } from '@next/third-parties/google';

export default function RootLayout({
  children,
}: {
  readonly children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en-US" className="bg-neutral-900 text-neutral-100 min-h-screen">
      <body suppressHydrationWarning>
        {children}
        <GoogleAnalytics gaId={googleAnalyticsId} />
        <React.Suspense fallback={null}>
          <ClientHooks />
        </React.Suspense>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: {
    default: localization.siteTitle,
    template: `%s | ${localization.siteTitle}`,
  },
  // FIXME: add post tagline to post page
  description: localization.siteDescription,
  applicationName: localization.siteTitle,
  keywords: localization.siteKeywords,
  creator: localization.siteAuthor,
  generator: 'Next.js',
  robots,
  twitter: {
    card: 'summary_large_image',
    site: twitter,
    creator: twitter,
  },
  metadataBase: new URL(baseUrl),
};

export const viewport: Viewport = {
  themeColor,
  colorScheme: 'dark',
};
