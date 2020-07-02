const { getStyleLoaders } = require('./utils');

module.exports = {
  test: /\.(scss|sass)$/,
  exclude: /\.module\.(scss|sass)$/,
  use: getStyleLoaders(
    { importLoaders: 3 },
    {
      loader: require.resolve('sass-loader'),
      options: {
        implementation: require('sass'),
        sourceMap: true,
      },
    }
  ),
};
