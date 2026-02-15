import type { SiteConfig } from '@maxpatiiuk/web-components/components/mp-root-layout';

export const siteConfig: SiteConfig = {
  title: 'Max Patiiuk',
  description: 'Senior SDE at Esri',
  keywords:
    'Max Patiiuk, Maksym Patiiuk, Max Patiiuk CV, Max Patiiuk portfolio, mambo shop, mambo, В гостях у MAMBO, мамбо, mambo experimental, Максим Патіюк',
  author: 'Max Patiiuk',
  baseUrl: 'https://max.patii.uk',
  themeColor: '#001122',
  googleAnalyticsId: 'G-36ESPJ8S03',
  twitter: '@maxpatiiuk',
} as const satisfies Record<string, unknown> & SiteConfig;
