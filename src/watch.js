const { spawn } = require('child_process');
const webpack = require('webpack');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const serverDevConfig = require('./webpack/server');
const clientDevConfig = require('./webpack/client');

module.exports = function(userConfig) {
  const serverConfig = userConfig.webpack.server
    ? userConfig.webpack.server(serverDevConfig, null, webpack)
    : serverDevConfig;
  const clientConfig = userConfig.webpack.client
    ? userConfig.webpack.client(clientDevConfig, null, webpack)
    : clientDevConfig;

  clientConfig.plugins.push(new FriendlyErrorsWebpackPlugin());

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

  clientCompiler.watch({}, () => {});

  if (!userConfig.clientOnly) {
    serverCompiler.watch({}, (err, stats) => {
      console.log(stats.toString('errors-only'));

      if (!stats.hasErrors()) {
        restartServer();
      }
    });
  }
};
