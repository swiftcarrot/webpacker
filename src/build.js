const path = require('path');
const fs = require('fs');
const rimraf = require('rimraf');
const { spawnSync } = require('child_process');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ManifestPlugin = require('webpack-manifest-plugin');
const clientProdConfig = require('./webpack/client.prod');
const serverProdConfig = require('./webpack/server.prod');

const cwd = process.cwd();

module.exports = function(cxx, cb) {
  process.env.NODE_ENV = 'production';
  // const options = Object.assign({ publicPath: '/' }, cxx, cxx.production);
  // const { publicPath } = options;
  const publicPath = '/assets/';

  const serverConfig = merge(
    {
      entry: {
        server: `${cwd}/src/server.js`
      },
      output: {
        path: `${cwd}/build`,
        publicPath
      },
      plugins: [
        new webpack.EnvironmentPlugin({
          NODE_ENV: 'development',
          MANIFEST_PATH: path.join(cwd, 'build', 'assets', 'manifest.json')
        })
      ]
    },
    serverProdConfig
  );

  const clientConfig = merge(
    {
      entry: {
        client: `${cwd}/src/client.js`
      },
      output: {
        path: `${cwd}/build/assets`,
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

  // rimraf.sync('./build');

  // todo: better webpack error outpu

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

      // spawnSync('rm', [
      //   '-rf',
      //   'build/styles.css',
      //   'build/styles.css.map',
      //   'build/fonts',
      //   'build/images'
      // ]);

      if (cb) cb();
    });
  });
};
