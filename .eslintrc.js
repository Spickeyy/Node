module.exports = {
  env: {
    es2021: true,
    node: true
  },
  extends:[
    'airbnb-base',
    'airbnb-typescript/base',
  ],
  parser: '@typescript-eslint/perser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json'
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
  },
};
