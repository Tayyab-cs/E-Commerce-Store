module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'linebreak-style': ['error', 'windows'],
    'no-shadow': ['error', { allow: ['err'] }],
    'consistent-return': 'off',
    'nonblock-statement-body-position': 'off',
    'object-curly-newline': 'off',
  },
};
