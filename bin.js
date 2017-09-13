#!/usr/bin/env node

const fs = require('fs');
const program = require('commander');
const init = require('./src/init');
const start = require('./src/start');
const build = require('./src/build');
const cwd = process.cwd();

program.command('init').description('init').action(function(options) {
  init();
});

program.command('start').description('start').action(function(options) {
  start();
});

program
  .command('build')
  .description('build')
  .action(function(options) {
    build();
  });

program.parse(process.argv);
