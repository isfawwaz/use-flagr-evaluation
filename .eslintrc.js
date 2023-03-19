module.exports = {
  root: true,
  env: {
    node: 'true',
  },
  extends: ['@isfawwaz/eslint-config-base', '@isfawwaz/eslint-config-jest'],
  rules: {
    'operator-linebreak': [
      'error',
      'before',
      {
        overrides: {
          '=': 'after',
          '||': 'after',
          '&&': 'after',
        },
      },
    ],
  },
  settings: {
    next: {
      rootDir: ['examples/*/'],
    },
  },
};
