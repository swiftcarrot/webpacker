const fs = require('fs');
const path = require('path');
const glob = require('glob');
const rimraf = require('rimraf');
const webpack = require('webpack');
const clientProdConfig = require('./webpack/client');
const serverProdConfig = require('./webpack/server');
const { appPath } = require('./webpack/configuration');

module.exports = function(userConfig, cb) {
  const clientConfig = clientProdConfig;
  const serverConfig = userConfig.webpack
    ? userConfig.webpack(serverProdConfig)
    : serverProdConfig;

  // todo: better webpack error output
  webpack(clientConfig, (err, stats) => {
    console.log(stats.toString({ chunks: false, colors: true }));

    if (!userConfig.clientOnly) {
      webpack(serverConfig, (err, stats) => {
        console.log(stats.toString({ chunks: false, colors: true }));

        if (cb) cb();
      });
    }
  });
};
