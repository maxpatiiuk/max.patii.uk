import eslintConfig from '@arcgis/eslint-config';
import globals from 'globals';

export default [
  ...eslintConfig,
  {
    languageOptions: {
      sourceType: 'module',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
];
