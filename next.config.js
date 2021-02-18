module.exports = {
	reactStrictMode: true,
	i18n: {
		locales: ['en-US'],
		defaultLocale: 'en-US',
	},
	redirects: ()=>[
		{
			source: '/shop.html',
			destination: '/shop/',
			permanent: true,
		},
		{
			source: '/projects/one_c',
			destination: 'https://mambo.zzz.com.ua/projects/one_c',
			permanent: true,
		},
		{
			source: '/map/files/d3_36.php',
			destination: 'https://mambo.zzz.com.ua/projects/one_c',
			permanent: true,
		}
	]
};