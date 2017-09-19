const webpack = require('webpack');
const merge = require('webpack-merge');
const sharedConfig = require('./shared');
const uglify = require('../uglify');

module.exports = merge(sharedConfig, {
  plugins: [
    // new webpack.EnvironmentPlugin({ NODE_ENV: 'production' }),
    // new webpack.optimize.UglifyJsPlugin(uglify)
    // todo: uglify es6 support
  ],
  devtool: 'source-map'
});
