const { parse } = require('url');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const { makeWebpackConfig } = require('./utils');

module.exports = function (listen) {
  const config = makeWebpackConfig();
  const compiler = webpack(config);
  const server = new WebpackDevServer(compiler, {
    ...config.devServer,
    historyApiFallback: true,
  });
  const url = parse(listen || 'http://127.0.0.1:5000');
  const { port, hostname } = url;

  server.listen(port, hostname, () => {
    console.log(`Starting server on ${hostname}:${port}`);
  });
};
