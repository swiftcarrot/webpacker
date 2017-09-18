const path = require('path');
const rimraf = require('rimraf');
const glob = require('glob');
const { spawn } = require('child_process');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ManifestPlugin = require('webpack-manifest-plugin');
const serverDevConfig = require('./webpack/server.dev');
const clientDevConfig = require('./webpack/client.dev');
const { appPath } = require('./webpack/configuration');

module.exports = function(userConfig) {
  process.env.NODE_ENV = 'development';

  const serverConfig = userConfig.webpack
    ? userConfig.webpack(serverDevConfig)
    : serverDevConfig;

  const clientCompiler = webpack(clientDevConfig);
  const serverCompiler = webpack(serverConfig);

  rimraf.sync(path.join(appPath, 'build'));

  function startServer() {
    console.log('startServer');
    return spawn('node', ['./build/index.js'], {
      stdio: 'inherit'
    });
  }

  let serverProcess;

  // todo: better webpack output
  clientCompiler.watch({}, (err, stats) => {
    console.log('client done');
  });

  if (!userConfig.clientOnly) {
    serverCompiler.watch({}, (err, stats) => {
      if (stats.hasErrors()) {
        console.log('server compiler failed');
      } else {
        if (serverProcess) {
          serverProcess.kill();
          serverProcess = startServer();
        } else {
          serverProcess = startServer();
        }
      }
    });
  }
};
