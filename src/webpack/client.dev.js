const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const clientConfig = require('./client');

module.exports = merge(
  {
    output: {
      filename: '[name].js',
      chunkFilename: '[name].js'
    },
    plugins: [
      new webpack.EnvironmentPlugin({ NODE_ENV: 'development' }),
      new ExtractTextPlugin({ filename: '[name].css' })
    ],
    devtool: 'source-map'
  },
  clientConfig
);
