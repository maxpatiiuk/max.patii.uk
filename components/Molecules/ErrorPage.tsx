import Link from 'next/link';
import React from 'react';

import { localization } from '../../const/localization';
import { icons } from '../Atoms/Icons';
import { Centered } from '../Atoms';

export function ErrorPage({ error }: { readonly error: Error }): JSX.Element {
  const isNotFound = error.message === localization.notFound;
  return (
    <Centered>
      <div className="text-center">
        <h1 className="text-4xl py-2 text-indigo-300">
          {isNotFound
            ? localization.notFound
            : localization.unexpectedErrorHasOccurred}
        </h1>
        <p>{isNotFound ? localization.notFoundDescription : error.message}</p>
        <Link
          href="/"
          className={`
            flex justify-center items-center pt-10 transition text-red-400
            hover:text-white
          `}
        >
          {icons.chevronLeft}
          {localization.returnToHomePage}
        </Link>
      </div>
    </Centered>
  );
}
