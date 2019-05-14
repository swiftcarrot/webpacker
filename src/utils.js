const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

exports.makeConfig = () => {
  const configPath = path.resolve('webpacker.config.js');
  const userConfig = fs.existsSync(configPath) ? require(configPath) : null;
  const config = userConfig
    ? userConfig(require('./webpack'), { webpack })
    : require('./webpack');

  return config;
};
