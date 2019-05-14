const { getStyleLoaders } = require('./utils');

module.exports = {
  test: /\.(scss|sass)$/,
  exclude: /\.module\.(scss|sass)$/,
  use: getStyleLoaders(
    { importLoaders: 2 },
    {
      loader: require.resolve('sass-loader'),
      options: { sourceMap: true }
    }
  )
};
