#!/usr/bin/env node
const Listr = require('listr');

const { prettiers, out, checkJson, installEslintBundle } = require('./src/tasks');

const tasks = [
  {
    title: 'Checking for package json',
    task: checkJson,
  },
  {
    title: 'Installing linting packages',
    task: installEslintBundle,
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
  .catch(({ message }) => console.error(`\n${message}`));
