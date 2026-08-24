import js from '@eslint/js'
import tsParser from '@typescript-eslint/parser'
import vue from 'eslint-plugin-vue'

export default [
  {
    ignores: ['dist', 'coverage'],
  },
  js.configs.recommended,
  ...vue.configs['flat/recommended'],
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
    },
    rules: {
      'no-unused-vars': 'off',
    },
  },
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: tsParser,
      },
    },
  },
]
