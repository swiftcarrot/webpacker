const merge = require('webpack-merge');
const sharedConfig = require('./shared');

module.exports = merge(sharedConfig, {
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js'
  },
  devtool: 'source-map'
});
