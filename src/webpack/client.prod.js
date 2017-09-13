const webpack = require('webpack');
const merge = require('webpack-merge');
const clientConfig = require('./client');
const uglify = require('./uglify');

module.exports = merge(clientConfig, {
  plugins: [new webpack.optimize.UglifyJsPlugin(uglify)],
  output: {
    filename: '[name]-[chunkhash].js',
    chunkFilename: '[name]-[chunkhash].js'
  },
  devtool: 'source-map'
});
