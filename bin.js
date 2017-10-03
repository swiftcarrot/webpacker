#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const program = require('commander');
const watch = require('./src/watch');
const build = require('./src/build');
const clean = require('./src/clean');
const devServer = require('./src/dev-server');
const cwd = process.cwd();

const configPath = path.resolve('cxx.config.js');
const userConfig = Object.assign(
  { clientOnly: true, webpack: { client: null, server: null } },
  fs.existsSync(configPath) ? require(configPath) : {}
);

program
  .command('watch')
  .description('watch')
  .action(function(options) {
    watch(userConfig);
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

program
  .command('dev-server')
  .description('dev server')
  .action(function(options) {
    devServer(userConfig);
  });

program.parse(process.argv);
