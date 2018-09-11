const fs = require('fs');
const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackAssetsManifest = require('webpack-assets-manifest');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { env, appPath } = require('../configuration');

const entry = glob
  .sync(path.join(appPath, 'packs/*.js'))
  .reduce((entry, pack) => {
    entry[path.basename(pack, '.js')] = pack;
    return entry;
  }, {});

const plugins = [
  new webpack.EnvironmentPlugin(JSON.parse(JSON.stringify(env))),

  new MiniCssExtractPlugin({
    filename:
      env.NODE_ENV === 'production'
        ? 'packs/[name].[contenthash:8].css'
        : 'packs/[name].css',
    chunkFilename:
      env.NODE_ENV === 'production'
        ? 'packs/[name].[contenthash:8].chunk.css'
        : 'packs/[name].chunk.css'
  }),

  new WebpackAssetsManifest({
    output: 'assets-manifest.json',
    entrypoints: true,
    publicPath: true
  })
];

const indexHTML = path.join(appPath, 'packs/index.html');

if (fs.existsSync(indexHTML)) {
  plugins.push(
    new HtmlWebpackPlugin({
      filename: 'index.html',
      minify: true,
      template: indexHTML
    })
  );
} else {
  Object.keys(entry).forEach(k => {
    const templatePath = path.join(appPath, `packs/${k}.html`);
    if (fs.existsSync(templatePath)) {
      plugins.push(
        new HtmlWebpackPlugin({
          filename: `${k}.html`,
          minify: true,
          chunks: [k],
          template: templatePath
        })
      );
    }
  });
}

module.exports = {
  entry: entry,

  output: {
    path: path.join(appPath, 'build')
  },

  performance: { hints: false },

  module: {
    rules: [
      require('../rules/assets'),
      require('../rules/css'),
      require('../rules/module.css'),
      require('../rules/sass'),
      require('../rules/module.sass'),
      require('../rules/babel.client')
    ]
  },

  optimization: {
    splitChunks: {
      chunks: 'all'
    },
    runtimeChunk: true
  },

  plugins: plugins
};
