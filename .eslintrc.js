module.exports = {
  extends: require.resolve('@umijs/max/eslint'),
  parserOptions: {
    ecmaFeatures: {
      legacyDecorators: true,
    },
  },
  rules: {
    'import/prefer-default-export': [0],
    'compat/compat': [0],
    '@typescript-eslint/consistent-type-assertions': 'off',
    '@typescript-eslint/no-unused-expressions': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
  },
};
