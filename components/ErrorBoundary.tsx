/*
 * Error Boundary for React Components. Catches exceptions and provides a
 * stack trace
 */

import React from 'react';

import { localization } from '../const/localization';
import { ButtonDanger } from './InteractivePrimitives';
import { ModalDialog } from './ModalDialog';

type ErrorBoundaryState =
  | {
      readonly hasError: false;
      readonly error: undefined;
      readonly errorInfo: undefined;
    }
  | {
      readonly hasError: true;
      readonly error: { readonly toString: () => string };
      readonly errorInfo: { readonly componentStack: string };
    };

export default class ErrorBoundary extends React.Component<
  { readonly children: JSX.Element },
  ErrorBoundaryState
> {
  public readonly state: ErrorBoundaryState = {
    hasError: false,
    error: undefined,
    errorInfo: undefined,
  };

  public componentDidCatch(
    error: { readonly toString: () => string },
    errorInfo: { readonly componentStack: string }
  ): void {
    console.error(error, errorInfo);
    this.setState({
      hasError: true,
      error,
      errorInfo,
    });
  }

  public render(): JSX.Element {
    return this.state.hasError ? (
      <ModalDialog
        title={'Unexpected Error'}
        buttons={
          <>
            <ButtonDanger
              props={{
                onClick(): void {
                  window.location.reload();
                },
              }}
            >
              {localization.reload}
            </ButtonDanger>
            <ButtonDanger
              props={{
                onClick(): void {
                  window.history.back();
                },
              }}
            >
              {localization.previousPage}
            </ButtonDanger>
          </>
        }
      >
        <p>{localization.unexpectedErrorHasOccurred}</p>
        <details style={{ whiteSpace: 'pre-wrap' }}>
          {this.state.error?.toString()}
          <br />
          {this.state.errorInfo?.componentStack}
        </details>
      </ModalDialog>
    ) : (
      this.props.children
    );
  }
}
