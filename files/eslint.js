const eslint = `{
  "extends": ["airbnb, prettier"],
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": ["error", {
      "endOfLine": "auto"
    }],
    "no-useless-return": 0,
    "array-callback-return": 0,
    "import/prefer-default-export": 0
  }
}`;

module.exports = { eslint };
