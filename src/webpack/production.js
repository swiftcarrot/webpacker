const merge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const sharedConfig = require('./shared');

module.exports = merge(sharedConfig, {
  mode: 'production',

  output: {
    filename: 'packs/[name].[chunkhash:8].js',
    chunkFilename: 'packs/[name].[chunkhash:8].chunk.js',
    publicPath: '/'
  },

  optimization: {
    runtimeChunk: true,
    splitChunks: {
      chunks: 'all'
    },
    minimizer: [
      new TerserPlugin({
        parallel: true,
        cache: true,
        sourceMap: true,
        terserOptions: {
          parse: {
            ecma: 8
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false
          },
          mangle: {
            safari10: true
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true
          }
        }
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  }
  // devtool: 'source-map'
});
