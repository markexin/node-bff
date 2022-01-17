module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      tsx: true,
      impliedStrict: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  env: {
    browser: true,
    amd: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'no-var': 'error',
    'prefer-const': 'error',
    'no-const-assign': 'error',
    'prefer-destructuring': 'error',
    quotes: ['error', 'single'],
    'no-eval': 'error',
    'prefer-template': 'error',
    'template-curly-spacing': 'error',
    'no-useless-escape': 'error',
    'space-before-function-paren': 0,
    'wrap-iife': 'error',
    'prefer-spread': 'error',
    semi: 'error',
    'arrow-parens': ['error', 'always'],
    'no-useless-constructor': 'error',
    'no-dupe-class-members': 'error',
    'no-duplicate-imports': 'error',
    eqeqeq: 'error',
    'no-unused-vars': [
      'error',
      { vars: 'all', args: 'after-used', ignoreRestSiblings: false },
    ],
    indent: ['error', 2],
  },
};
