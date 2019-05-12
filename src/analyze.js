const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = function(userConfig, cb) {
  const clientConfig = userConfig.webpack.client
    ? userConfig.webpack.client(require('./webpack'), null, webpack)
    : require('./webpack');

  clientConfig.plugins.push(
    new BundleAnalyzerPlugin({ analyzerMode: 'static' })
  );

  // todo: better webpack error output
  webpack(clientConfig, (err, stats) => {
    if (err) console.error(err);
    console.log(stats.toString({ chunks: false, colors: true }));
  });
};
