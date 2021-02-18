/*
*
* Error Boundary for React Components. Catches exceptions and provides a stack trace
*
* */

'use strict';

import React                        from 'react';
import { ModalDialog }              from './ModalDialog';
import { ButtonDanger }             from './InteractivePrimitives';
import { LanguageStringsStructure } from '../lib/languages';
import LanguageContext              from './LanguageContext';

type ErrorBoundaryState =
	{
		hasError: false,
		error: undefined,
		errorInfo: undefined,
	} | {
	hasError: true,
	error: {toString: () => string},
	errorInfo: {componentStack: string}
};

const languageStrings: LanguageStringsStructure<{
	title: string,
	reload: string,
	previousPage: string,
	unexpectedErrorHasOccurred: string,
}> = {
	'en-US': {
		title: 'Unexpected Error',
		reload: 'Reload',
		previousPage: 'Previous page',
		unexpectedErrorHasOccurred: 'An unexpected error has occurred.',
	},
};

export default class ErrorBoundary
	extends React.Component<{children: JSX.Element}, ErrorBoundaryState> {
	state: ErrorBoundaryState = {
		hasError: false,
		error: undefined,
		errorInfo: undefined,
	};

	componentDidCatch(
		error: {toString: () => string},
		errorInfo: {componentStack: string},
	): void {
		console.error(error, errorInfo);
		this.setState({
			hasError: true,
			error,
			errorInfo,
		});
	}

	render(): JSX.Element {
		if (this.state.hasError)
			return <LanguageContext.Consumer>
				{(language) => <ModalDialog
					title={'Unexpected Error'}
					buttons={<>
						<ButtonDanger
							props={{
								onClick: window.location.reload,
							}}
						>
							{languageStrings[language].reload}
						</ButtonDanger>
						<ButtonDanger
							props={{
								onClick: window.history.back,
							}}
						>
							{languageStrings[language].previousPage}
						</ButtonDanger>
					</>}
				>
					<p>{
						languageStrings[language].unexpectedErrorHasOccurred
					}</p>
					<details style={{whiteSpace: 'pre-wrap'}}>
						{this.state.error && this.state.error.toString()}
						<br />
						{this.state.errorInfo!.componentStack}
					</details>
				</ModalDialog>
				}
			</LanguageContext.Consumer>;
		else
			return this.props.children;
	}
}