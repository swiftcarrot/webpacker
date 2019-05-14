const webpack = require('webpack');
const { makeConfig } = require('./utils');

module.exports = function() {
  const config = makeConfig();

  webpack(config, (err, stats) => {
    if (err) console.error(err);
    console.log(stats.toString({ chunks: false, colors: true }));
  });
};
