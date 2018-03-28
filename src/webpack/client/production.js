const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const sharedConfig = require('./shared');
const uglify = require('../uglify');

module.exports = merge(sharedConfig, {
  mode: 'production',
  output: {
    filename: '[name]-[chunkhash].js',
    chunkFilename: '[name]-[chunkhash].js'
  },

  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: uglify,
        parallel: true,
        cache: true
        // sourceMap: shouldUseSourceMap,
      })
    ],
    splitChunks: {
      chunks: 'all'
    },
    runtimeChunk: true
  }
  // devtool: 'source-map'
});
