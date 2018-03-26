const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
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
          ? 'static/css/[name].[chunkhash:8].css'
          : 'static/css/[name].css',
      chunkFilename:
        env.NODE_ENV === 'production'
          ? 'static/css/[name].[chunkhash:8].chunk.css'
          : 'static/css/[name].chunk.css'
    }),

    new ManifestPlugin({
      publicPath: output.publicPath,
      fileName: 'manifest.json',
      writeToFileEmit: true
    })
  ]
};
