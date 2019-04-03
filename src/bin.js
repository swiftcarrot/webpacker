#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const yargs = require('yargs');
const init = require('./init');
const clean = require('./clean');
const watch = require('./watch');
const build = require('./build');
const serve = require('./serve');
const analyze = require('./analyze');

const configPath = path.resolve('webpacker.config.js');
const userConfig = Object.assign(
  { clientOnly: true, webpack: { client: null, server: null } },
  fs.existsSync(configPath) ? require(configPath) : {}
);

yargs
  .command('clean', 'clean', () => {}, () => clean())
  .command('init', 'init', () => {}, () => init())
  .command(
    'watch',
    'watch build',
    yargs => yargs.option('e', { default: 'development' }),
    argv => watch(userConfig, argv)
  )
  .command(
    'build',
    'build',
    yargs => yargs.option('e', { default: 'production' }),
    argv => build(userConfig, argv)
  )
  .command(
    'serve',
    'webpack serve',
    yargs => {
      yargs.option('l', { default: 'http://127.0.0.1:3000' });
    },
    argv => {
      serve(userConfig, argv.l);
    }
  )
  .command(
    'analyze',
    'webpack analyze',
    yargs => yargs.option('e', { default: 'production' }),
    argv => {
      analyze(userConfig, argv.l);
    }
  ).argv;
