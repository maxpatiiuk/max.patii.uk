import { MetadataRoute } from 'next';
import { localization } from '../const/localization';
import { baseUrl, themeColor } from '../const/siteConfig';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: localization.siteTitle,
    short_name: localization.siteTitle,
    description: localization.siteDescription,
    icons: [
      {
        src: '/icon1.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/icon2.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon3.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    theme_color: themeColor,
    background_color: themeColor,
    start_url: baseUrl,
    display: 'standalone',
  };
}
