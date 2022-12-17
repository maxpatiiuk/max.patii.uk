import Link from 'next/link';
import React from 'react';

import Layout from '../components/Layout';
import type { LanguageStringsStructure } from '../lib/languages';
import { commonStrings } from '../localization/global';
import { Centered } from './UI';

const languageStrings: LanguageStringsStructure<{
  readonly header: string;
  readonly message: string;
}> = {
  'en-US': {
    header: 'Oops! Nothing was found',
    message: `The page you are looking for might have been removed,
    had its name changed or is temporarily unavailable.`,
  },
};

function ErrorPage({ errorCode }: { readonly errorCode: number }): JSX.Element {
  return (
    <Layout title={errorCode.toString()}>
      {(language): JSX.Element => (
        <Centered>
          <div className="text-center">
            <h1 className="text-9xl py-2 text-indigo-300">{errorCode}</h1>
            <h2>{languageStrings[language].header}</h2>
            <p>
              {languageStrings[language].message}
              <Link
                href="/"
                className="block pt-10 transition text-red-400 hover:text-black"
              >
                {commonStrings[language].returnToHomePage}
              </Link>
            </p>
          </div>
        </Centered>
      )}
    </Layout>
  );
}

export default ErrorPage;
