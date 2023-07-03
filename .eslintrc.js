module.exports = {
  extends: require.resolve('@umijs/max/eslint'),
  parserOptions: {
    ecmaFeatures: {
      legacyDecorators: true
    }
  },
  rules: {
    'no-undef': 'error', // 禁止使用未定义的变量
    'import/prefer-default-export': [0], //在模块中只导出一个变量时  禁用
    'compat/compat': [0], //检查代码在不同浏览器和 Node.js 版本中的兼容性  禁用
    '@typescript-eslint/consistent-type-assertions': 'off', //使用一致的类型断言语法
    '@typescript-eslint/no-unused-expressions': 'off', // 禁止使用未使用的表达式
    '@typescript-eslint/no-use-before-define': 'off' //禁止在变量声明之前使用变量
  }
}
