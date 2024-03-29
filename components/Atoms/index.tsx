import React from 'react';

export function Centered({
  children,
}: {
  readonly children: React.ReactNode;
}): JSX.Element {
  return (
    <main className="flex items-center justify-center w-screen h-screen text-center">
      {children}
    </main>
  );
}
