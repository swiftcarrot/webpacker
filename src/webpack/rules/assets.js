const { env, publicPath } = require('../configuration.js');

module.exports = {
  test: /\.(jpg|jpeg|png|gif|svg|eot|ttf|woff|woff2)$/i,
  use: [
    {
      loader: require.resolve('file-loader'),
      options: {
        // publicPath: '/packs/',
        name:
          env.NODE_ENV === 'production' // todo: env fix
            ? 'packs/[name].[hash:8].[ext]'
            : 'packs/[name].[ext]'
      }
    }
  ]
};
