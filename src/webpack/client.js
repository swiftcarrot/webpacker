const path = require('path');
const { env } = require('process');
const glob = require('glob');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const rules = require('./rules');
const { publicPath, appPath } = require('./paths');

module.exports = {
  entry: glob.sync(path.join(appPath, 'packs/*.js')).reduce((entry, pack) => {
    entry[path.basename(pack, '.js')] = pack;
    return entry;
  }, {}),
  output: {
    path: path.join(appPath, 'build/packs'),
    publicPath
  },
  performance: { hints: false },
  module: { rules },
  plugins: [
    new webpack.EnvironmentPlugin({ NODE_ENV: env.NODE_ENV || 'development' }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: module =>
        module.context && module.context.indexOf('node_modules') !== -1
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),

    new ExtractTextPlugin(
      env.NODE_ENV === 'production' ? '[name]-[hash].css' : '[name].css'
    ),

    new ManifestPlugin({
      fileName: 'manifest.json',
      writeToFileEmit: true,
      publicPath
    })
  ]
};
