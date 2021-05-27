import 'tailwindcss/tailwind.css';

import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import React from 'react';

import ErrorBoundary from '../components/ErrorBoundary';
import LanguageContext from '../components/LanguageContext';
import type { AvailableLanguages } from '../lib/languages';

export default function app({ Component, pageProps }: AppProps) {
  const { defaultLocale = 'en-US', locale = defaultLocale } = useRouter();

  return (
    <LanguageContext.Provider value={locale as AvailableLanguages['type']}>
      <ErrorBoundary>
        <Component {...pageProps} />
      </ErrorBoundary>
    </LanguageContext.Provider>
  );
}
