import Document, { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

import { googleAnalyticsId } from '../const/siteConfig';

export default class MyDocument extends Document {
  public render(): JSX.Element {
    return (
      <Html className="bg-neutral-900 text-neutral-100">
        <Head />
        <body>
          <Main />
          <NextScript />
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
          />
          <script
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              // eslint-disable-next-line @typescript-eslint/naming-convention
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${googleAnalyticsId}', {
                  page_path: window.location.pathname,
                });`,
            }}
          />
        </body>
      </Html>
    );
  }
}
