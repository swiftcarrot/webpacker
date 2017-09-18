const merge = require('webpack-merge');
const clientConfig = require('./client');

module.exports = merge(clientConfig, {
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js'
  },
  devtool: 'source-map'
});
