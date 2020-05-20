module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: ["standard", "prettier-standard/eslint-file"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {},
};
