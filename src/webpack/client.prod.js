const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const clientConfig = require('./client');
const uglify = require('./uglify');

const cwd = process.cwd();

module.exports = merge(clientConfig, {
  plugins: [
    new webpack.EnvironmentPlugin({ NODE_ENV: 'production' }),
    new webpack.optimize.UglifyJsPlugin(uglify),
    new ExtractTextPlugin({ filename: '[name]-[contenthash].css' })
  ],
  output: {
    filename: '[name]-[chunkhash].js',
    chunkFilename: '[name]-[chunkhash].js'
  },

  devtool: 'source-map'
});
