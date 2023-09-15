module.exports = {
  "extends": [
    "react-app",
    "react-app/jest",
    "prettier",
  ],
  "plugins": ["prettier"],
  "rules": {
    "semi": ["error", "always"],
    "no-trailing-spaces": ["error", { "skipBlankLines": true }],
    "no-nested-ternary": "error",
    "multiline-ternary": ["error", "always-multiline"],
    "block-spacing": "error",
    'indent': ['error', 2],
    'no-console': 'error',
  }
};
