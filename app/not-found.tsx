import React from 'react';

import { ErrorPage } from '../components/Molecules/ErrorPage';
import { localization } from '../const/localization';
import { Metadata } from 'next';

const notFound = new Error(localization.notFound);
export default function (): JSX.Element {
  return <ErrorPage error={notFound} />;
}

export const metadata: Metadata = {
  title: localization.notFound,
};
