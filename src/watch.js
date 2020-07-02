const webpack = require('webpack');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const { makeWebpackConfig } = require('./utils');

module.exports = function () {
  const config = makeWebpackConfig();
  config.plugins.push(new FriendlyErrorsWebpackPlugin());
  const compiler = webpack(config);

  compiler.watch({}, () => {});
};
