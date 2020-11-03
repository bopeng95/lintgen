const path = require('path');
const execa = require('execa');
const fse = require('fs-extra');

const { packages } = require('./fixtures');

const { eslint } = require('../files/eslint');
const { prettier, prettierIgnore } = require('../files/prettier');

const checkJson = () => {
  const json = fse.readJsonSync(
    path.join(process.cwd(), 'package.json'),
    { throws: false }
  );
  if (!json) throw new Error(`No package json found in path ${process.cwd()}`);
};

const installEslintBundle = () => execa('npx', ['install-peerdeps', '-D', packages[0]]);

const prettiers = [
  {
    title: packages[1],
    task: () => execa('npm', ['i', '-D', packages[1]]),
  },
  {
    title: packages[2],
    task: () => execa('npm', ['i', '-D', packages[2]]),
  },
  {
    title: packages[3],
    task: () => execa('npm', ['i', '-D', packages[3]]),
  },
];

const out = [
  {
    title: 'eslintrc json',
    task: () => fse.outputFile(path.join(process.cwd(), '.eslintrc.json'), eslint),
  },
  {
    title: 'prettierrc',
    task: () => fse.outputFile(path.join(process.cwd(), '.prettierrc'), prettier),
  },
  {
    title: 'prettier ignore',
    task: () => fse.outputFile(path.join(process.cwd(), '.prettierignore'), prettierIgnore),
  },
];

module.exports = { prettiers, out, checkJson, installEslintBundle };
