const fs = require('fs');
const path = require('path');
const glob = require('glob');
const rimraf = require('rimraf');
const webpack = require('webpack');
const clientProdConfig = require('./webpack/client.prod');
const serverProdConfig = require('./webpack/server.prod');
const { appPath } = require('./webpack/configuration');

module.exports = function(userConfig, cb) {
  process.env.NODE_ENV = 'production';

  rimraf.sync(path.join(appPath, 'build'));

  const clientConfig = clientProdConfig;
  const serverConfig = userConfig.webpack
    ? userConfig.webpack(serverProdConfig)
    : serverProdConfig;

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
