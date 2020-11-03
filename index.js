#!/usr/bin/env node
const path = require('path');
const Listr = require('listr');
const execa = require('execa');
const fse = require('fs-extra');

const { eslint } = require('./files/eslint');
const { prettier, prettierIgnore } = require('./files/prettier');

const packages = {
  0: 'eslint-config-airbnb',
  1: 'eslint-plugin-prettier',
  2: 'eslint-config-prettier',
  3: 'prettier',
};

const prettiers = [
  {
    title: packages[1],
    task: () => execa('npm', ['i', '-D', packages[1]])
  },
  {
    title: packages[2],
    task: () => execa('npm', ['i', '-D', packages[2]])
  },
  {
    title: packages[3],
    task: () => execa('npm', ['i', '-D', packages[3]])
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

const tasks = [
  {
    title: 'Checking for package json',
    task: () => {
      const json = fse.readJsonSync(path.join(process.cwd(), 'package.json'), { throws: false });
      if (!json) throw new Error(`No package json file found in path ${process.cwd()}`);
    },
  },
  {
    title: 'Installing linting packages',
    task: () => execa('npx', ['install-peerdeps', '-D', packages[0]]),
  },
  {
    title: 'Installing prettier packages',
    task: () => new Listr(prettiers, { concurrently: true }),
  },
  {
    title: 'Writing out files',
    task: () => new Listr(out, { concurrently: true }),
  },
];

const task = new Listr(tasks);

task.run()
  .then(() => console.log('\nDone!'))
  .catch(({ message }) => console.log(`\n${message}`));
