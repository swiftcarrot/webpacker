const { getStyleLoaders, getCSSModuleLocalIdent } = require('./utils');

module.exports = {
  test: /\.module\.(scss|sass)$/,
  use: getStyleLoaders(
    {
      importLoaders: 3,
      modules: {
        getLocalIdent: getCSSModuleLocalIdent
      }
    },
    {
      loader: require.resolve('sass-loader'),
      options: {
        implementation: require('sass'),
        sourceMap: true
      }
    }
  )
};
