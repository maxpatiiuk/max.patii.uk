'use client';

import React from 'react';

import { ErrorPage } from '../components/Molecules/ErrorPage';
import { Metadata } from 'next';
import { localization } from '../const/localization';

export default function Error({ error }: { error: Error }): JSX.Element {
  return <ErrorPage error={error} />;
}

export const metadata: Metadata = {
  title: localization.unexpectedErrorHasOccurred,
};
