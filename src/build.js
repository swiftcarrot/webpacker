const webpack = require('webpack');

module.exports = function(userConfig, cb) {
  const config = userConfig.webpack
    ? userConfig.webpack(require('./webpack'), null, webpack)
    : require('./webpack');

  // todo: better webpack error output
  webpack(config, (err, stats) => {
    if (err) console.error(err);
    console.log(stats.toString({ chunks: false, colors: true }));
  });
};
