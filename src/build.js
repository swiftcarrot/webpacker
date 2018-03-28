const fs = require('fs');
const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const clientProdConfig = require('./webpack/client');
const serverProdConfig = require('./webpack/server');
const { appPath } = require('./webpack/configuration');

module.exports = function(userConfig, cb) {
  const serverConfig = userConfig.webpack.server
    ? userConfig.webpack.server(serverProdConfig, null, webpack)
    : serverProdConfig;
  const clientConfig = userConfig.webpack.client
    ? userConfig.webpack.client(clientProdConfig, null, webpack)
    : clientProdConfig;

  // todo: better webpack error output
  webpack(clientConfig, (err, stats) => {
    if (err) console.error(err);
    console.log(stats.toString({ chunks: false, colors: true }));

    if (!userConfig.clientOnly) {
      webpack(serverConfig, (err, stats) => {
        console.log(stats.toString({ chunks: false, colors: true }));

        if (cb) cb();
      });
    }
  });
};
