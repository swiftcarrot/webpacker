const { parse } = require('url');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const { makeConfig } = require('./utils');

module.exports = function(listen) {
  const config = makeConfig();
  const clientCompiler = webpack(config);
  const server = new WebpackDevServer(clientCompiler, {
    historyApiFallback: true
  });
  const url = parse(listen || 'http://127.0.0.1:5000');
  const { port, hostname } = url;

  server.listen(port, hostname, () => {
    console.log(`Starting server on ${hostname}:${port}`);
  });
};
