const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const { env } = require('../configuration.js');

exports.getStyleLoaders = function getStyleLoaders(cssOptions, preProcessor) {
  const loaders = [
    env.NODE_ENV === 'production'
      ? MiniCssExtractPlugin.loader
      : require.resolve('style-loader'),
    {
      loader: require.resolve('css-loader'),
      options: cssOptions
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        ident: 'postcss',
        sourceMap: true,
        plugins: () => [
          autoprefixer({
            browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9']
          })
        ]
      }
    }
  ];

  if (preProcessor) {
    loaders.push(preProcessor);
  }

  return loaders;
};
