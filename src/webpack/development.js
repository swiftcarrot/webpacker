const { merge } = require('webpack-merge');
const shared = require('./shared');

module.exports = merge(shared(), {
  mode: 'development',
  output: {
    filename: 'packs/[name].js',
    chunkFilename: 'packs/[name].js',
    publicPath: '/',
  },
  devtool: 'cheap-module-source-map',
});
