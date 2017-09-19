#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const program = require('commander');
const start = require('./src/start');
const build = require('./src/build');
const clean = require('./src/clean');
const cwd = process.cwd();

const configPath = path.resolve('cxx.config.js');
const userConfig = Object.assign(
  { clientOnly: true },
  fs.existsSync(configPath) ? require(configPath) : {}
);

program
  .command('start')
  .description('start')
  .action(function(options) {
    start(userConfig);
  });

program
  .command('build')
  .description('build')
  .action(function(options) {
    build(userConfig);
  });

program
  .command('clean')
  .description('clean')
  .action(function(options) {
    clean(userConfig);
  });

program.parse(process.argv);
