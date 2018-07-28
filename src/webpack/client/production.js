const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const sharedConfig = require('./shared');
const uglify = require('../uglify');

module.exports = merge(sharedConfig, {
  mode: 'production',
  output: {
    filename: 'packs/[name].[chunkhash:8].js',
    chunkFilename: 'packs/[name].[chunkhash:8].chunk.js',
    publicPath: '/'
  },

  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: uglify,
        parallel: true,
        cache: true
        // sourceMap: shouldUseSourceMap,
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
    splitChunks: {
      chunks: 'all'
    },
    runtimeChunk: true
  }
  // devtool: 'source-map'
});
