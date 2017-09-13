const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const clientConfig = require('./client');

module.exports = merge(clientConfig, {
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js'
  },
  devtool: 'source-map'
});
