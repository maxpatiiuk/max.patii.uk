import type { SiteConfig } from '@maxpatiiuk/static-site-forge';

export const siteConfig = {
  title: 'Max Patiiuk',
  description: 'Senior SDE at Esri',
  keywords:
    'Max Patiiuk, Maksym Patiiuk, Max Patiiuk CV, Max Patiiuk portfolio, mambo shop, mambo, В гостях у MAMBO, мамбо, mambo experimental, Максим Патіюк',
  author: 'Max Patiiuk',
  authorTitle: 'Senior SDE at Esri',
  baseUrl: 'https://max.patii.uk',
  themeColor: '#001122',
  googleAnalyticsId: 'G-36ESPJ8S03',
  twitter: '@maxpatiiuk',
  links: [
    { label: 'max@patii.uk', url: 'mailto:max@patii.uk' },
    { label: 'linkedin', url: 'https://linkedin.patii.uk' },
    { label: 'github', url: 'https://github.patii.uk' },
    { label: 'twitter', url: 'https://twitter.patii.uk' },
    { label: 'instagram', url: 'https://instagram.patii.uk' },
    { label: 'youtube', url: 'https://youtube.com/@maxpatiiuk' },
    { label: 'books', url: 'https://books.patii.uk' },
    { label: 'blog', url: 'https://blog.patii.uk' },
    { label: 'about', url: 'https://doc.patii.uk' },
    { label: 'cv', url: 'https://cv.patii.uk' },
  ],
} as const satisfies Record<string, unknown> & SiteConfig;
