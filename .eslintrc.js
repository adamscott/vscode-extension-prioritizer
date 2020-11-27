/** @type { import('eslint').Linter.Config } */
module.exports = {
  env: {
    es2021: true,
    node: true
  },
  extends: [
    'standard-with-typescript',
    'plugin:mocha/recommended',
    'plugin:vue/vue3-recommended'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    project: './tsconfig.eslint.json',
    tsconfigRootDir: __dirname,
    extraFileExtensions: ['.vue']
  },
  plugins: [
    'mocha'
  ],
  rules: {
  },
  globals: {
    acquireVsCodeApi: true
  }
}
