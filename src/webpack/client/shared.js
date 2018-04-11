const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackAssetsManifest = require('webpack-assets-manifest');
const { env, output, appPath } = require('../configuration');

module.exports = {
  entry: glob.sync(path.join(appPath, 'packs/*.js')).reduce((entry, pack) => {
    entry[path.basename(pack, '.js')] = pack;
    return entry;
  }, {}),

  output: {
    path: path.join(appPath, 'build/packs'),
    publicPath: output.publicPath
  },

  performance: { hints: false },

  module: {
    rules: [
      require('../loaders/assets'),
      require('../loaders/sass'),
      require('../loaders/babel.client')
    ]
  },

  optimization: {
    splitChunks: {
      chunks: 'all'
    },
    runtimeChunk: true
  },

  plugins: [
    new webpack.EnvironmentPlugin(JSON.parse(JSON.stringify(env))),

    new MiniCssExtractPlugin({
      filename:
        env.NODE_ENV === 'production'
          ? '[name].[chunkhash:8].css'
          : '[name].css',
      chunkFilename:
        env.NODE_ENV === 'production'
          ? '[name].[chunkhash:8].chunk.css'
          : '[name].chunk.css'
    }),

    new WebpackAssetsManifest({
      entrypoints: true,
      publicPath: true
    })
  ]
};
