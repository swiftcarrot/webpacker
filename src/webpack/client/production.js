const webpack = require('webpack');
const merge = require('webpack-merge');
const sharedConfig = require('./shared');
const uglify = require('../uglify');

module.exports = merge(sharedConfig, {
  output: {
    filename: '[name]-[chunkhash].js',
    chunkFilename: '[name]-[chunkhash].js'
  },
  plugins: [new webpack.optimize.UglifyJsPlugin(uglify)],
  devtool: 'source-map'
});
