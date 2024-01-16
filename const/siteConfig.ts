export const themeColor = '#001122';
export const robots = { index: true, follow: true } as const;
export const privatePage = { index: false, follow: false } as const;
export const googleAnalyticsId = 'G-36ESPJ8S03';
export const twitter = '@maxpatiiuk';

export const baseUrl =
  typeof process.env.VERCEL_URL === 'string'
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000';
