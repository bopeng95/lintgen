const prettier = `{
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all"
}`;

const prettierIgnore = `build/
node_modules/
package-lock.json
package.json
`;

module.exports = { prettier, prettierIgnore };
