const { env } = require('../configuration');

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
            name:
              env.NODE_ENV === 'production' // todo: env fix
                ? 'packs/[name].[hash:8].[ext]'
                : 'packs/[name].[ext]'
          }
        }
      ]
    }
  ]
};
