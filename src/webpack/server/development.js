const webpack = require('webpack');
const merge = require('webpack-merge');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const sharedConfig = require('./shared');

module.exports = merge(sharedConfig, {
  plugins: [
    // new webpack.EnvironmentPlugin({ NODE_ENV: 'development' }),
    // new FriendlyErrorsWebpackPlugin(),
    // new webpack.NoErrorsPlugin() // todo
  ],

  // todo: source map makes incr build slow
  devtool: 'source-map'
});
