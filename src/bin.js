#!/usr/bin/env node

const yargs = require('yargs');
const init = require('./init');
const clean = require('./clean');
const watch = require('./watch');
const build = require('./build');
const devServer = require('./dev-server');
const analyze = require('./analyze');

yargs
  .command(
    'clean',
    'clean',
    () => {},
    () => clean()
  )
  .command(
    'init',
    'init',
    () => {},
    () => init()
  )
  .command(
    'watch',
    'watch build',
    (yargs) => yargs.option('e', { default: 'development' }),
    (argv) => watch(argv)
  )
  .command(
    'build',
    'build',
    (yargs) => yargs.option('e', { default: 'production' }),
    (argv) => build(argv)
  )
  .command(
    'dev-server',
    'webpack dev-server',
    (yargs) => {
      yargs.option('l', { default: 'http://127.0.0.1:3000' });
    },
    (argv) => {
      devServer(argv.l);
    }
  )
  .command(
    'serve',
    'webpack dev-server',
    (yargs) => {
      yargs.option('l', { default: 'http://127.0.0.1:3000' });
    },
    (argv) => {
      devServer(argv.l);
    }
  )
  .command(
    'analyze',
    'webpack analyze',
    (yargs) => yargs.option('e', { default: 'production' }),
    (argv) => {
      analyze(argv.l);
    }
  ).argv;
