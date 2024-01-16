'use client';

import React from 'react';

export function ClientHooks(): null {
  useServiceWorker();
  return null;
}

function useServiceWorker() {
  React.useEffect(() => {
    if ('serviceWorker' in navigator)
      window.addEventListener(
        'load',
        () => void navigator.serviceWorker.register('/sw.js'),
      );
  }, []);
}
