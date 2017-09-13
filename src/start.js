const path = require('path');
const rimraf = require('rimraf');
const glob = require('glob');
const { spawn } = require('child_process');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ManifestPlugin = require('webpack-manifest-plugin');
const serverDevConfig = require('./webpack/server.dev');
const clientDevConfig = require('./webpack/client.dev');

const cwd = process.cwd();

function spawnWithLog(file, args) {
  return spawn(file, args, { stdio: 'inherit' });
}

module.exports = function() {
  const publicPath = '/packs/';

  const entries = {};
  const packs = glob.sync('packs/*.js');

  packs.forEach(pack => {
    entries[path.basename(pack, '.js')] = `${cwd}/${pack}`;
  });

  console.log(entries);

  const clientConfig = merge(
    {
      entry: entries,
      output: {
        path: `${cwd}/build/packs`,
        publicPath
      },
      plugins: [
        new ManifestPlugin({
          fileName: 'manifest.json',
          writeToFileEmit: true,
          publicPath
        })
      ]
    },
    clientDevConfig
  );

  const serverConfig = merge(
    {
      entry: { index: `${cwd}/index.js` },
      output: {
        path: `${cwd}/build`,
        publicPath
      },
      plugins: [
        new webpack.EnvironmentPlugin({
          NODE_ENV: 'development',
          MANIFEST_PATH: path.join(cwd, 'build', 'packs', 'manifest.json')
        })
      ]
    },
    serverDevConfig
  );

  const clientCompiler = webpack(clientConfig);
  const serverCompiler = webpack(serverConfig);

  rimraf.sync(path.join(cwd, 'build'));

  function startServer() {
    console.log('startServer');
    return spawn('node', ['./build/index.js'], {
      stdio: 'inherit'
    });
  }

  let serverProcess;
  // todo: better webpack output

  clientCompiler.watch({}, (err, stats) => {
    console.log('client done');
  });

  serverCompiler.watch({}, (err, stats) => {
    if (stats.hasErrors()) {
      console.log(stats);
      console.log('server compiler failed');
    } else {
      if (serverProcess) {
        serverProcess.kill();
        serverProcess = startServer();
      } else {
        serverProcess = startServer();
      }
    }
  });
};
