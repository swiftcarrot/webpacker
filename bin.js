#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const program = require('commander');
const watch = require('./src/watch');
const build = require('./src/build');
const devServer = require('./src/dev-server');
const clean = require('./src/clean');

const configPath = path.resolve('webpacker.config.js');
const userConfig = Object.assign(
  { clientOnly: true, webpack: { client: null, server: null } },
  fs.existsSync(configPath) ? require(configPath) : {}
);

program
  .command('watch')
  .description('watch')
  .action(function() {
    watch(userConfig);
  });

program
  .command('build')
  .description('build')
  .action(function() {
    build(userConfig);
  });

program
  .command('clean')
  .description('clean')
  .action(function() {
    clean(userConfig);
  });

program
  .command('dev-server')
  .description('dev server')
  .action(function() {
    devServer(userConfig);
  });

program.parse(process.argv);
