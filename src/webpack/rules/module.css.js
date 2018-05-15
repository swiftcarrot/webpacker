const { getStyleLoaders } = require('./utils');

module.exports = {
  test: /\.module\.css$/,
  use: getStyleLoaders({
    importLoaders: 1,
    modules: true
  })
};
