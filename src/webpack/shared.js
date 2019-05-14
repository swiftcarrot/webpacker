const fs = require('fs');
const path = require('path');
const glob = require('glob');
const webpack = require('wepback');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackAssetsManifest = require('webpack-assets-manifest');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const rules = require('../rules');
const { getDirectory, isProd, makeConfig } = require('../utils');

module.exports = () => {
  const cwd = getDirectory();
  const { entryPath, outputPath, manifestOutputPath } = makeConfig();
  const entry = glob
    .sync(path.join(entryPath, '*.js'))
    .reduce((entry, pack) => {
      entry[path.basename(pack, '.js')] = pack;
      return entry;
    }, {});

  const plugins = [
    new webpack.EnvironmentPlugin(JSON.parse(JSON.stringify(process.env))),
    new MiniCssExtractPlugin({
      filename: isProd()
        ? 'packs/[name].[contenthash:8].css'
        : 'packs/[name].css',
      chunkFilename: isProd()
        ? 'packs/[name].[contenthash:8].chunk.css'
        : 'packs/[name].chunk.css'
    }),

    new WebpackAssetsManifest({
      output: manifestOutputPath,
      entrypoints: true,
      publicPath: true,
      writeToDisk: true
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

  const wepbackConfig = {
    entry,
    output: { path: outputPath },
    performance: { hints: false },
    module: { rules },
    plugins
  };

  return wepbackConfig;
};
