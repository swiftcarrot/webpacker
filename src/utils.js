const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

const getDirectory = () => fs.realpathSync(process.cwd());

const makeConfig = () => {
  const cwd = getDirectory();
  const configPath = path.resolve('webpacker.config.js');
  const userConfig = fs.existsSync(configPath) ? require(configPath) : null;
  const config = Object.assign(
    {
      entryPath: path.join(cwd, 'packs'),
      outputPath: path.join(cwd, 'build'),
      manifestOutputPath: 'assets-manifest.json'
    },
    userConfig
  );

  return config;
};

exports.makeConfig = makeConfig;

exports.makeWebpackConfig = () => {
  const config = makeConfig();
  const webpackConfig =
    config && config.webpack
      ? config.webpack(require('./webpack'), { webpack })
      : require('./webpack');

  return webpackConfig;
};

exports.getDirectory = getDirectory;

exports.getEnv = () => process.env.NODE_ENV;

exports.isProd = () => process.env.NODE_ENV === 'production';
