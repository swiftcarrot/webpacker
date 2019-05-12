const webpack = require('webpack');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

module.exports = function(userConfig) {
  const clientConfig = userConfig.webpack.client
    ? userConfig.webpack.client(require('./webpack'), null, webpack)
    : require('./webpack');

  clientConfig.plugins.push(new FriendlyErrorsWebpackPlugin());

  const clientCompiler = webpack(clientConfig);

  clientCompiler.watch({}, () => {});
};
