import { googleAnalyticsId } from '../const/siteConfig';

export const pageView = (url: string): void =>
  // @ts-expect-error
  window.gtag('config', googleAnalyticsId, {
    page_path: url,
  });
