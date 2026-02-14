import { siteConfig } from '../config.js';

export function htmlDocument({
  title,
  description,
  ogImage,
  body,
}: {
  readonly title: string;
  readonly description?: string;
  readonly ogImage?: string;
  readonly body: string;
}): string {
  const fullTitle =
    title === siteConfig.title
      ? siteConfig.title
      : `${title} | ${siteConfig.title}`;
  const desc = description ?? siteConfig.description;

  return `<!DOCTYPE html>
<html lang="en-US">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${fullTitle}</title>
  <meta name="description" content="${desc}">
  <meta name="author" content="${siteConfig.author}">
  <meta name="keywords" content="${siteConfig.keywords}">
  <meta name="theme-color" content="${siteConfig.themeColor}">
  <meta name="color-scheme" content="dark">
  <meta name="robots" content="index, follow">
  <meta property="og:title" content="${fullTitle}">
  <meta property="og:description" content="${desc}">
  <meta property="og:type" content="website">
  ${ogImage !== undefined ? `<meta property="og:image" content="${siteConfig.baseUrl}${ogImage}">` : ''}
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="${siteConfig.twitter}">
  <meta name="twitter:creator" content="${siteConfig.twitter}">
  <link rel="manifest" href="/manifest.webmanifest">
  <link rel="stylesheet" href="/styles/global.css">
  <script type="module" src="/js/web-components.js"></script>
  <script async src="https://www.googletagmanager.com/gtag/js?id=${siteConfig.googleAnalyticsId}"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${siteConfig.googleAnalyticsId}');
  </script>
</head>
<body>
  ${body}
</body>
</html>`;
}
