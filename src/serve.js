const serve = require('webpack-serve');

module.exports = function(userConfig) {
  const clientConfig = userConfig.webpack.client
    ? userConfig.webpack.client(require('./webpack/client'), null, webpack)
    : require('./webpack/client');

  serve(clientConfig);
}
