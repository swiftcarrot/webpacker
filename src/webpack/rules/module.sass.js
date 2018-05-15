const { getStyleLoaders } = require('./utils');

module.exports = {
  test: /\.module\.(scss|sass)$/,
  use: getStyleLoaders(
    {
      importLoaders: 1,
      modules: true
    },
    {
      loader: require.resolve('sass-loader'),
      options: { sourceMap: true }
    }
  )
};
