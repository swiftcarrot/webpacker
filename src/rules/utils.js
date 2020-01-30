const loaderUtils = require('loader-utils');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const { isProd } = require('../utils');

exports.getStyleLoaders = (cssOptions, preProcessor) => {
  const loaders = [
    isProd() ? MiniCssExtractPlugin.loader : require.resolve('style-loader'),
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
          require('postcss-preset-env')({
            autoprefixer: {
              flexbox: 'no-2009'
            },
            stage: 3
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

exports.getCSSModuleLocalIdent = (
  context,
  localIdentName,
  localName,
  options
) => {
  const fileNameOrFolder = context.resourcePath.match(
    /index\.module\.(css|scss|sass)$/
  )
    ? '[folder]'
    : '[name]';
  const hash = loaderUtils
    .getHashDigest(context.resourcePath + localName, 'md5', 'base64', 6)
    .replace(new RegExp('[^a-zA-Z0-9\\-_\u00A0-\uFFFF]', 'g'), '-')
    .replace(/^((-?[0-9])|--)/, '_$1');

  if (isProd()) {
    return hash;
  }

  const className = loaderUtils.interpolateName(
    context,
    fileNameOrFolder + '_' + localName + '__' + hash,
    options
  );
  return className.replace('.module_', '_');
};
