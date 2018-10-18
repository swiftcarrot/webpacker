const { parse } = require('url');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
// const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

module.exports = function(userConfig, listen) {
  const clientConfig = userConfig.webpack.client
    ? userConfig.webpack.client(require('./webpack/client'), null, webpack)
    : require('./webpack/client');
  // clientConfig.plugins.push(new FriendlyErrorsWebpackPlugin());
  const clientCompiler = webpack(clientConfig);
  const server = new WebpackDevServer(clientCompiler, {
    historyApiFallback: true
  });
  const url = parse(listen || 'http://127.0.0.1:5000');
  const { port, hostname } = url;

  server.listen(port, hostname, () => {
    console.log(`Starting server on ${hostname}:${port}`);
  });
};
