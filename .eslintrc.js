module.exports = {
  extends: [
    'react-app',
    'react-app/jest',
    'prettier',
    'plugin:prettier/recommended',
  ],
  plugins: ['prettier', '@emotion'],
  rules: {
    semi: ['error', 'always'],
    'no-trailing-spaces': ['error', { skipBlankLines: true }],
    'no-nested-ternary': 'error',
    'multiline-ternary': ['error', 'always-multiline'],
    'block-spacing': 'error',
    indent: ['error', 2],
    'no-console': 'error',
    'prettier/prettier': ['error', { singleQuote: true, parser: 'babel' }],
    '@emotion/jsx-import': 'error',
    '@emotion/no-vanilla': 'error',
    '@emotion/import-from-emotion': 'error',
    '@emotion/styled-import': 'error',
  },
};
