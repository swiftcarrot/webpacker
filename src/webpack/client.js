const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const { env, output, appPath } = require('./configuration');

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
      require('./loaders/assets'),
      require('./loaders/sass'),
      require('./loaders/babel.client')
    ]
  },
  plugins: [
    new webpack.EnvironmentPlugin(JSON.parse(JSON.stringify(env))),

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
      publicPath: output.publicPath,
      fileName: 'manifest.json',
      writeToFileEmit: true
    })
  ]
};
