const webpack = require('webpack');
const { makeWebpackConfig } = require('./utils');

module.exports = function () {
  const config = makeWebpackConfig();

  webpack(config, (err, stats) => {
    if (err) console.error(err);
    console.log(stats.toString({ chunks: false, colors: true }));
  });
};
