#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const program = require('commander');
const watch = require('./src/watch');
const build = require('./src/build');
const serve = require('./src/serve');
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
  .command('serve')
  .description('webpack serve')
  .option('-l', '--listen <uri>', 'listen uri')
  .action(function(uri) {
    console.log(uri)
    serve(userConfig, uri);
  });

program.parse(process.argv);
