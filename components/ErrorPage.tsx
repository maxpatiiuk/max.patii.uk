import Link from 'next/link';
import React from 'react';

import Layout from '../components/Layout';
import { localization } from '../const/localization';
import { Centered } from './UI';

function ErrorPage({ errorCode }: { readonly errorCode: number }): JSX.Element {
  return (
    <Layout title={errorCode.toString()}>
      <Centered>
        <div className="text-center">
          <h1 className="text-9xl py-2 text-indigo-300">{errorCode}</h1>
          <h2>{localization.notFound}</h2>
          <p>
            {localization.notFoundDescription}
            <Link
              href="/"
              className="block pt-10 transition text-red-400 hover:text-black"
            >
              {localization.returnToHomePage}
            </Link>
          </p>
        </div>
      </Centered>
    </Layout>
  );
}

export default ErrorPage;
