const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { makeConfig } = require('./utils');

module.exports = function() {
  const config = makeConfig();
  config.plugins.push(new BundleAnalyzerPlugin({ analyzerMode: 'static' }));

  webpack(config, (err, stats) => {
    if (err) console.error(err);
    console.log(stats.toString({ chunks: false, colors: true }));
  });
};
