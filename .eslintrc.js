module.exports = {
  'root': true,
  'env': {
    'node': true,
  },
  'extends': [
    'plugin:vue/vue3-essential',
    '@vue/eslint-config-typescript',
  ],
  'parserOptions': {
    'parser': '@typescript-eslint/parser',
  },
  'rules': {
    'vue/component-name-in-template-casing': [
      'error',
      'kebab-case',
    ],
  },
};
