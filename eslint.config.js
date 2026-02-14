const { default: eslintConfig } = require('@arcgis/eslint-config');
const globals = require('globals');

module.exports = [
  ...eslintConfig,
  {
    languageOptions: {
      sourceType: 'module',
      parserOptions: {
        project: './tsconfig.json',
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
];
