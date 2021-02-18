import React from 'react';

export const Centered = ({
	children,
}: {
	children: React.ReactNode
}) => <div className='flex-grow flex items-center mb-10 justify-center'>
	<div className='sm:flex gap-x-5 max-w-2xl mx-5'>
		{children}
	</div>
</div>;
