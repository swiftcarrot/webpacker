const fs = require('fs');
const path = require('path');
const glob = require('glob');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackAssetsManifest = require('webpack-assets-manifest');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { getDirectory, getEnv } = require('../utils');

const cwd = getDirectory();
const env = getEnv();
const entry = glob.sync(path.join(cwd, 'packs/*.js')).reduce((entry, pack) => {
  entry[path.basename(pack, '.js')] = pack;
  return entry;
}, {});

const plugins = [
  new MiniCssExtractPlugin({
    filename:
      env === 'production'
        ? 'packs/[name].[contenthash:8].css'
        : 'packs/[name].css',
    chunkFilename:
      env === 'production'
        ? 'packs/[name].[contenthash:8].chunk.css'
        : 'packs/[name].chunk.css'
  }),

  new WebpackAssetsManifest({
    output: 'assets-manifest.json',
    entrypoints: true,
    publicPath: true
  })
];

const indexHTML = path.join(cwd, 'packs/index.html');

if (fs.existsSync(indexHTML) && !entry.index) {
  plugins.push(
    new HtmlWebpackPlugin({
      filename: 'index.html',
      minify: true,
      template: indexHTML
    })
  );
} else {
  Object.keys(entry).forEach(k => {
    const templatePath = path.join(cwd, `packs/${k}.html`);
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
    path: path.join(cwd, 'build')
  },

  performance: { hints: false },

  module: {
    rules: [
      require('./rules/assets'),
      require('./rules/css'),
      require('./rules/module.css'),
      require('./rules/sass'),
      require('./rules/module.sass'),
      require('./rules/babel'),
      require('./rules/yaml')
    ]
  },

  plugins: plugins
};
