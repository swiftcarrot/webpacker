const webpack = require('webpack');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const { makeConfig } = require('./utils');

module.exports = function() {
  const config = makeConfig();
  config.plugins.push(new FriendlyErrorsWebpackPlugin());
  const compiler = webpack(config);

  compiler.watch({}, () => {});
};
