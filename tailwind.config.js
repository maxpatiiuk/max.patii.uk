module.exports = {
	purge: {
		content: [
			'./pages/**/*.tsx',
			'./components/**/*.tsx',
		],
		options: {
			keyframes: true,
		},
	},
	corePlugins: {
		float: false,
		clear: false,
		skew: false,
	},
	darkMode: 'media',
	theme: {
		extend: {
			colors: {
				facebook: {
					dark: '#359',
					light: '#468',
				},
				twitter: {
					dark: '#3ae',
					light: '#4bf',
				},
				instagram: {
					dark: '#c38',
					light: '#d48',
				},
				email: {
					dark: '#83b',
					light: '#94c',
				},
				linked_in: {
					dark: '#47b',
					light: '#58c',
				},
				steam: {
					dark: '#222',
					light: '#333',
				}
			}
		}
	},
	variants: {
		transitionProperty: ['responsive', 'motion-safe', 'motion-reduce'],
		animation: ['responsive', 'motion-safe', 'motion-reduce'],
		borderWidth: ['responsive', 'hover', 'focus'],
		extend: {
			padding: ['hover'],
			backgroundImage: ['hover'],
			fontSize: ['group-hover']
		},
	},
	plugins: [],
};
