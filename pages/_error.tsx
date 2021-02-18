import ErrorPage           from '../components/ErrorPage';
import React               from 'react';
import { NextPageContext } from 'next';

const error = ({statusCode}: {statusCode: number}) =>
	<ErrorPage errorCode={statusCode} />;

error.getInitialProps = ({res, err}: NextPageContext) => (
	{
		statusCode: res ?
			res.statusCode :
			err ?
				err.statusCode :
				404,
	}
);

export default error;