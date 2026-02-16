// Apply Node.js customElements polyfill
import 'lit';

// Patch the polyfill to suppress Vite HRM warning
const originalDefine = customElements.define;
customElements.define = (name, constructor, options): void => {
  const originalWarn = console.warn;
  try {
    // Ignore warning about re-defining custom elements in HRM. This is safe
    // with the DOM polyfill
    console.warn = (...args): unknown => {
      if (
        typeof args[0] === 'string' &&
        args[0].includes(
          'This may have been caused by live reload or hot module ',
        )
      ) {
        return;
      }
      return originalWarn(...args);
    };
    const original = originalDefine.call(
      customElements,
      name,
      constructor,
      options,
    );
    return original;
  } finally {
    console.warn = originalWarn;
  }
};
