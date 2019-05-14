const { getStyleLoaders, getCSSModuleLocalIdent } = require('./utils');

module.exports = {
  test: /\.module\.(scss|sass)$/,
  use: getStyleLoaders(
    {
      importLoaders: 2,
      modules: true,
      getLocalIdent: getCSSModuleLocalIdent
    },
    {
      loader: require.resolve('sass-loader'),
      options: { sourceMap: true }
    }
  )
};
