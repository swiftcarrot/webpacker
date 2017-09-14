const { env } = require('process');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = [
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    loader: require.resolve('babel-loader'),
    options: {
      presets: [require('./babel')],
      cacheDirectory: true
    }
  },
  {
    test: /\.(scss|css)$/,
    loader: ExtractTextPlugin.extract({
      use: [
        {
          loader: require.resolve('css-loader'),
          options: {
            // modules: true,
            camelCase: true,
            importLoaders: 2
          }
        },
        {
          loader: require.resolve('postcss-loader'),
          options: {
            ident: 'postcss',
            plugins: () => [
              autoprefixer({
                browsers: [
                  '>1%',
                  'last 4 versions',
                  'Firefox ESR',
                  'not ie < 9'
                ]
              })
            ]
          }
        },
        require.resolve('sass-loader')
      ]
    })
  },

  {
    test: /\.(jpg|jpeg|png|gif|svg|eot|ttf|woff|woff2)$/i,
    use: [
      {
        loader: require.resolve('file-loader'),
        options: {
          publicPath: '/packs/',
          name:
            env.NODE_ENV === 'production'
              ? '[name]-[hash].[ext]'
              : '[name].[ext]'
        }
      }
    ]
  }
];
