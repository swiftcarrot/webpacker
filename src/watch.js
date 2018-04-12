const { spawn } = require('child_process');
const webpack = require('webpack');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

module.exports = function(userConfig) {
  const clientConfig = userConfig.webpack.client
    ? userConfig.webpack.client(require('./webpack/client'), null, webpack)
    : require('./webpack/client');

  clientConfig.plugins.push(new FriendlyErrorsWebpackPlugin());

  const clientCompiler = webpack(clientConfig);

  clientCompiler.watch({}, () => {});

  if (userConfig.clientOnly) return;

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

  if (!userConfig.clientOnly) {
    const serverConfig = userConfig.webpack.server
      ? userConfig.webpack.server(require('./webpack/server'), null, webpack)
      : require('./webpack/server');
    const serverCompiler = webpack(serverConfig);

    serverCompiler.watch({}, (err, stats) => {
      console.log(stats.toString('errors-only'));

      if (!stats.hasErrors()) {
        restartServer();
      }
    });
  }
};
