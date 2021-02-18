import 'tailwindcss/tailwind.css';
import { AppProps }                 from 'next/app';
import ErrorBoundary                from '../components/ErrorBoundary';
import { useRouter }                from 'next/router';
import React                        from 'react';
import LanguageContext              from '../components/LanguageContext';
import { AvailableLanguages }       from '../lib/languages';

export default function app({Component, pageProps}: AppProps) {

	const {defaultLocale = 'en-US', locale = defaultLocale} = useRouter();

	return <LanguageContext.Provider
		value={locale as AvailableLanguages['type']}
	>
		<ErrorBoundary>
			<Component {...pageProps} />
		</ErrorBoundary>
	</LanguageContext.Provider>;
}