const path = require('path');
const fse = require('fs-extra');
const _ = require('lodash');

const { extname } = path;

function ManifestPlugin(opts) {
  this.opts = _.assign(
    {
      basePath: '',
      fileName: 'manifest.json',
      transformExtensions: /^(gz|map)$/i,
      writeToFileEmit: false,
      serialize: function(manifest) {
        return JSON.stringify(manifest, null, 2);
      }
    },
    opts || {}
  );
}

ManifestPlugin.prototype.apply = function(compiler) {
  const moduleAssets = {};

  const moduleAsset = function(module, file) {
    moduleAssets[file] = path.join(
      path.dirname(file),
      path.basename(module.userRequest)
    );
  };

  const emit = compilation => {
    const { publicPath } = compilation.options.output;
    const stats = compilation.getStats().toJson();

    const entrypoints = compilation.chunkGroups.reduce((result, group) => {
      const files = new Set();
      group.chunks.forEach(chunk => {
        chunk.files.forEach(file => {
          files.add(`${chunk.name}${extname(file)}`);
        });
      });
      result[group.name] = Array.from(files);
      return result;
    }, {});

    let files = compilation.chunks.reduce((files, chunk) => {
      return chunk.files.reduce((files, path) => {
        let name = chunk.name ? chunk.name : null;

        if (name) {
          name = name + extname(path);
        } else {
          name = path;
        }

        return files.concat({
          path: path,
          chunk: chunk,
          name: name,
          isInitial: chunk.isOnlyInitial(),
          isChunk: true,
          isAsset: false,
          isModuleAsset: false
        });
      }, files);
    }, []);

    files = stats.assets.reduce(function(files, asset) {
      const name = moduleAssets[asset.name];
      if (name) {
        return files.concat({
          path: asset.name,
          name: name,
          isInitial: false,
          isChunk: false,
          isAsset: true,
          isModuleAsset: true
        });
      }

      const isEntryAsset = asset.chunks.length > 0;
      if (isEntryAsset) {
        return files;
      }

      return files.concat({
        path: asset.name,
        name: asset.name,
        isInitial: false,
        isChunk: false,
        isAsset: true,
        isModuleAsset: false
      });
    }, files);

    files = files.filter(file => file.path.indexOf('hot-update') < 0);

    if (this.opts.basePath) {
      files = files.map(file => {
        file.name = this.opts.basePath + file.name;
        return file;
      });
    }

    if (publicPath) {
      files = files.map(file => {
        file.path = publicPath + file.path;
        return file;
      });
    }

    files = files.map(file => {
      file.name = file.name.replace(/\\/g, '/');
      file.path = file.path.replace(/\\/g, '/');
      return file;
    });

    const manifest = files.reduce(function(manifest, file) {
      manifest[file.name] = file.path;
      return manifest;
    }, {});

    manifest.entrypoints = entrypoints;
    const output = this.opts.serialize(manifest);

    const outputFolder = compilation.options.output.path;
    const outputFile = path.resolve(
      compilation.options.output.path,
      this.opts.fileName
    );
    const outputName = path.relative(outputFolder, outputFile);

    compilation.assets[outputName] = {
      source: function() {
        return output;
      },
      size: function() {
        return output.length;
      }
    };

    if (this.opts.writeToFileEmit) {
      fse.outputFileSync(outputFile, output);
    }
  };

  compiler.hooks.compilation.tap('ManifestPlugin', function(compilation) {
    compilation.hooks.moduleAsset.tap('ManifestPlugin', moduleAsset);
  });
  compiler.hooks.emit.tap('ManifestPlugin', emit);
};

module.exports = ManifestPlugin;
