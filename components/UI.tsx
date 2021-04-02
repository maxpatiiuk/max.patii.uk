import React from 'react';

export const Centered = ({
  children,
}: {
  children: React.ReactNode
}) => <div className='w-screen h-screen flex items-center justify-center
  text-center'>
  {children}
</div>;
