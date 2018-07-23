const merge = require('webpack-merge');
const sharedConfig = require('./shared');

module.exports = merge(sharedConfig, {
  mode: 'development',
  output: {
    filename: 'packs/[name].js',
    chunkFilename: 'packs/[name].js',
    publicPath: '/'
  },
  devtool: 'source-map'
});
