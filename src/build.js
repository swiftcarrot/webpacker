const path = require('path');
const fs = require('fs');
const glob = require('glob');
const rimraf = require('rimraf');
const { spawnSync } = require('child_process');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ManifestPlugin = require('webpack-manifest-plugin');
const clientProdConfig = require('./webpack/client.prod');
const serverProdConfig = require('./webpack/server.prod');

module.exports = function(cxx, cb) {
  const cwd = process.cwd();

  process.env.NODE_ENV = 'production';
  // const options = Object.assign({ publicPath: '/' }, cxx, cxx.production);
  // const { publicPath } = options;
  const publicPath = '/packs/';

  const serverConfig = merge(
    {
      entry: {
        index: `${cwd}/index.js`
      },
      output: {
        path: `${cwd}/build`,
        publicPath
      },
      plugins: [
        new webpack.EnvironmentPlugin({
          NODE_ENV: 'development',
          MANIFEST_PATH: path.join(cwd, 'build', 'packs', 'manifest.json')
        })
      ]
    },
    serverProdConfig
  );

  const clientConfig = merge(
    {
      entry: glob.sync('packs/*.js').reduce((entry, pack) => {
        entry[path.basename(pack, '.js')] = `${cwd}/${pack}`;
        return entry;
      }, {}),
      output: {
        path: `${cwd}/build/packs`,
        publicPath
      },
      plugins: [
        new ManifestPlugin({
          fileName: 'manifest.json',
          writeToFileEmit: true,
          publicPath
        })
      ]
    },
    clientProdConfig
  );

  rimraf.sync(path.join(cwd, 'build'));

  // todo: better webpack error output
  webpack(clientConfig, (err, stats) => {
    webpack(serverConfig, (err, stats) => {
      if (err) {
        console.error(err.stack || err);
        if (err.details) {
          console.error(err.details);
        }
        return;
      }

      const info = stats.toJson();
      if (stats.hasErrors()) {
        console.error(info.errors);
        return;
      }

      if (stats.hasWarnings()) {
        console.warn(info.warnings);
      }

      if (cb) cb();
    });
  });
};
