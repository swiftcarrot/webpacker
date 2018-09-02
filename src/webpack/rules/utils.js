const loaderUtils = require('loader-utils');
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

exports.getCSSModuleLocalIdent = function(
  context,
  localIdentName,
  localName,
  options
) {
  const fileNameOrFolder = context.resourcePath.match(
    /index\.module\.(css|scss|sass)$/
  )
    ? '[folder]'
    : '[name]';
  const hash = loaderUtils
    .getHashDigest(context.resourcePath + localName, 'md5', 'base64', 6)
    .replace(new RegExp('[^a-zA-Z0-9\\-_\u00A0-\uFFFF]', 'g'), '-')
    .replace(/^((-?[0-9])|--)/, '_$1');

  if (env.NODE_ENV === 'production') {
    return hash;
  }

  const className = loaderUtils.interpolateName(
    context,
    fileNameOrFolder + '_' + localName + '__' + hash,
    options
  );
  return className.replace('.module_', '_');
};
