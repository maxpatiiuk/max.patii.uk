import eslintConfig from '@arcgis/eslint-config';
import globals from 'globals';

export default [
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
