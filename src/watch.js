const path = require('path');
const glob = require('glob');
const { spawn } = require('child_process');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ManifestPlugin = require('webpack-manifest-plugin');
const serverDevConfig = require('./webpack/server');
const clientDevConfig = require('./webpack/client');
const { appPath } = require('./webpack/configuration');

module.exports = function(userConfig) {
  const serverConfig = userConfig.webpack.server
    ? userConfig.webpack.server(serverDevConfig, null, webpack)
    : serverDevConfig;
  const clientConfig = userConfig.webpack.client
    ? userConfig.webpack.client(clientDevConfig, null, webpack)
    : clientDevConfig;

  const serverCompiler = webpack(serverConfig);
  const clientCompiler = webpack(clientConfig);

  let serverProcess;

  function startServer() {
    console.log('startServer');
    return spawn('node', ['./build/index.js'], {
      stdio: 'inherit'
    });
  }

  function restartServer() {
    if (serverProcess) {
      serverProcess.kill();
      serverProcess = startServer();
    } else {
      serverProcess = startServer();
    }
  }

  // todo: better webpack output
  clientCompiler.watch({}, (err, stats) => {
    console.log('client done');
    console.log(stats.toString('errors-only'));

    // if (!stats.hasErrors()) {
    //   restartServer();
    // }
  });

  if (!userConfig.clientOnly) {
    serverCompiler.watch({}, (err, stats) => {
      console.log(stats.toString('errors-only'));

      if (!stats.hasErrors()) {
        restartServer();
      }
    });
  }
};
