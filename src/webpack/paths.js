const fs = require('fs');
const path = require('path');
const { env } = require('process');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  publicPath: '/packs/',
  appPath: resolveApp('.')
};
