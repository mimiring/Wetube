module.exports = {
  env: {
    browser: true,
    node: true,
  },

  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: ["prettier"],
  extends: ["eslint:recommended"],
};
