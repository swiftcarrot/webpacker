const { getStyleLoaders, getCSSModuleLocalIdent } = require('./utils');

module.exports = {
  test: /\.module\.css$/,
  use: getStyleLoaders({
    importLoaders: 1,
    modules: {
      getLocalIdent: getCSSModuleLocalIdent,
    },
  }),
};
