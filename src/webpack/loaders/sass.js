const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const { env } = require('../configuration.js');

module.exports = {
  test: /\.(scss|sass|css)$/i,
  loader: ExtractTextPlugin.extract({
    use: [
      {
        loader: require.resolve('css-loader')
        // options: {
        //   modules: true,
        //   camelCase: true,
        //   importLoaders: 2
        // }
      },
      {
        loader: require.resolve('postcss-loader'),
        options: {
          ident: 'postcss',
          plugins: () => [
            autoprefixer({
              browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9']
            })
          ]
        }
      },
      require.resolve('sass-loader')
    ]
  })
};
