const webpack = require('webpack');

module.exports = function(userConfig, cb) {
  const clientConfig = userConfig.webpack.client
    ? userConfig.webpack.client(require('./webpack'), null, webpack)
    : require('./webpack');

  // todo: better webpack error output
  webpack(clientConfig, (err, stats) => {
    if (err) console.error(err);
    console.log(stats.toString({ chunks: false, colors: true }));
  });
};
