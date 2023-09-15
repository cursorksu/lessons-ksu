module.exports = {
  "extends": [
    "react-app",
    "react-app/jest",
    "prettier",
  ],
  "plugins": ["prettier"],
  "rules": {
    "no-nested-ternary": "error",
    "multiline-ternary": ["error", "always-multiline"]
  }
};
