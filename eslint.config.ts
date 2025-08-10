import js from '@eslint/js';
import globals from 'globals';
import json from '@eslint/json';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import ts from 'typescript-eslint';
import { globalIgnores } from 'eslint/config';

export default ts.config(
  globalIgnores(['dist/**/*', 'package-lock.json']),
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    plugins: { js },
    extends: [js.configs.recommended, ts.configs.recommended],
    languageOptions: { globals: globals.browser },
  },
  {
    files: ['**/*.json'],
    plugins: { json },
    language: 'json/json',
    extends: [json.configs.recommended],
  },
  {
    files: ['**/*.jsonc'],
    plugins: { json },
    language: 'json/jsonc',
    extends: [json.configs.recommended],
  },
  {
    files: ['**/*.json5'],
    plugins: { json },
    language: 'json/json5',
    extends: [json.configs.recommended],
  },
  eslintConfigPrettier,
);
