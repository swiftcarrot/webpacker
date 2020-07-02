const path = require('path');
const fs = require('fs-extra');
const webpack = require('webpack');
const { getDirectory, makeWebpackConfig } = require('./utils');

module.exports = function () {
  const cwd = getDirectory();
  const config = makeWebpackConfig();

  webpack(config, (err, stats) => {
    if (err) console.error(err);
    console.log(stats.toString({ chunks: false, colors: true }));

    fs.copySync(path.join(cwd, 'public'), path.join(cwd, 'build'));
  });
};
