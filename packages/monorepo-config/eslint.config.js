import { globalIgnores } from 'eslint/config';
import eslintConfig from '@arcgis/eslint-config';
import eslintConfigLumina from '@arcgis/eslint-config/lumina';

export default [
  globalIgnores(['node_modules/', 'dist/']),
  ...eslintConfig,
  ...eslintConfigLumina,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ['**/*.tsx'],
    rules: {
      'lumina/tag-name-rules': ['error', { namespaces: ['mp-'] }],
    },
  },
  {
    files: ['**/*.md'],
    rules: {
      'markdown/require-alt-text': 'off',
    },
  },
];
