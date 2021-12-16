module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:css-modules/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 13,
    sourceType: 'module'
  },
  plugins: ['react', 'css-modules', 'jsx-a11y', '@typescript-eslint', 'prettier'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'prettier/prettier': 'error',
    'react/prop-types': 0,
    '@typescript-eslint/explicit-function-return-type': 'off',
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'css-modules/no-unused-class': [2, { camelCase: true }],
    'css-modules/no-undef-class': [2, { camelCase: true }]
  }
};
