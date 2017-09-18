const webpack = require('webpack');
const merge = require('webpack-merge');
const uglify = require('./uglify');
const serverConfig = require('./server');

module.exports = merge(serverConfig, {
  plugins: [
    // new webpack.EnvironmentPlugin({ NODE_ENV: 'production' }),
    // new webpack.optimize.UglifyJsPlugin(uglify)
    // todo: uglify es6 support
  ],
  devtool: 'source-map'
});
