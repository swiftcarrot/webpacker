const path = require('path');
const { env } = require('process');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const rules = require('./rules');
const { appPath, publicPath } = require('./paths');

module.exports = {
  entry: {
    index: path.join(appPath, 'index.js')
  },
  output: {
    path: path.join(appPath, 'build'),
    publicPath,
    filename: '[name].js',
    libraryTarget: 'commonjs-module'
  },
  target: 'node',
  node: {
    __dirname: false,
    __filename: false
  },
  externals: [nodeExternals()],
  performance: { hints: false },
  module: { rules: rules },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: env.NODE_ENV,
      MANIFEST_PATH: path.join(appPath, 'build', 'packs', 'manifest.json')
    }),

    new ExtractTextPlugin({ filename: 'styles.css' }) // todo

    // todo: banner on js only
    /*
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      // entryOnly: true,
      test: /\.js$/
    })
    */
  ]
};
