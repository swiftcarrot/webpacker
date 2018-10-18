const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

module.exports = function(userConfig) {
  const clientConfig = userConfig.webpack.client
    ? userConfig.webpack.client(require('./webpack/client'), null, webpack)
    : require('./webpack/client');
  clientConfig.plugins.push(new FriendlyErrorsWebpackPlugin());
  const clientCompiler = webpack(clientConfig);
  const server = new WebpackDevServer(clientCompiler, {
    historyApiFallback: true
  });

  server.listen(8080, '127.0.0.1', () => {
    console.log('Starting server on http://localhost:8080');
  });
};
