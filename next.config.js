module.exports = {
	reactStrictMode: true,
	i18n: {
		locales: ['en-US'],
		defaultLocale: 'en-US',
	},
	redirects: ()=>[
		{
			source: '/shop.html',
			destination: 'https://shop.mambo.in.ua/',
			permanent: true,
		},
		{
			source: '/project/one_c',
			destination: 'https://mambo.zzz.com.ua/project/one_c',
			permanent: true,
		},
		{
			source: '/map/files/d3_36.php',
			destination: 'https://mambo.zzz.com.ua/project/one_c',
			permanent: true,
		},
		{
			source: '/project/arduino_call',
			destination: 'https://mambo.zzz.com.ua/project/arduino_call',
			permanent: true,
		}
	]
};