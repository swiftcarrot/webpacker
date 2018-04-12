const webpack = require('webpack');

module.exports = function(userConfig, cb) {
  const clientConfig = userConfig.webpack.client
    ? userConfig.webpack.client(require('./webpack/client'), null, webpack)
    : require('./webpack/client');

  // todo: better webpack error output
  webpack(clientConfig, (err, stats) => {
    if (err) console.error(err);
    console.log(stats.toString({ chunks: false, colors: true }));

    if (!userConfig.clientOnly) {
      const serverConfig = userConfig.webpack.server
        ? userConfig.webpack.server(require('./webpack/server'), null, webpack)
        : require('./webpack/server');

      webpack(serverConfig, (err, stats) => {
        console.log(stats.toString({ chunks: false, colors: true }));

        if (cb) cb();
      });
    }
  });
};
