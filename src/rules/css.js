const { getStyleLoaders } = require('./utils');

module.exports = {
  test: /\.css$/,
  exclude: /\.module\.css$/,
  use: getStyleLoaders({
    importLoaders: 1,
  }),
};
