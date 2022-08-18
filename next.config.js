module.exports = {
  reactStrictMode: true,
  i18n: {
    locales: ['en-US'],
    defaultLocale: 'en-US',
  },
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  redirects: () => [
    {
      source: '/en/:any*',
      destination: '/',
      permanent: true,
    },
    {
      source: '/news/:any*',
      destination: '/',
      permanent: true,
    },
    {
      source: '/contacts/:any*',
      destination: '/',
      permanent: true,
    },
    {
      source: '/services/:any*',
      destination: '/',
      permanent: true,
    },
    {
      source: '/project/:any*',
      destination: '/projects/:any*',
      permanent: true,
    },
    {
      source: '/projects',
      destination: '/',
      permanent: true,
    },
    {
      source: '/shop.html',
      destination: 'https://shop.mambo.in.ua/',
      permanent: true,
    },
    {
      source: '/shop/:any*',
      destination: 'https://shop.mambo.in.ua/',
      permanent: true,
    },
    {
      source: '/project/one_c',
      destination: 'http://mambo.zzz.com.ua/project/one_c',
      permanent: true,
    },
    {
      source: '/map/files/d3_36.php',
      destination: 'http://mambo.zzz.com.ua/project/one_c',
      permanent: true,
    },
    {
      source: '/project/arduino_call',
      destination: 'http://mambo.zzz.com.ua/project/arduino_call',
      permanent: true,
    },
  ],
};
