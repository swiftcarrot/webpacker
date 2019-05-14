const { isProd } = require('../../utils');

module.exports = {
  oneOf: [
    {
      test: /icons\/.*.\.svg$/,
      use: [{ loader: require.resolve('@svgr/webpack') }]
    },

    {
      test: /\.(jpg|jpeg|png|gif|svg|eot|ttf|woff|woff2)$/i,
      use: [
        {
          loader: require.resolve('file-loader'),
          options: {
            name: isProd()
              ? 'packs/[name].[hash:8].[ext]'
              : 'packs/[name].[ext]'
          }
        }
      ]
    }
  ]
};
