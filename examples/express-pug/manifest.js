const fs = require('fs');
const path = require('path');

const env = process.env.NODE_ENV || 'development';

function assignLocals(res, manifest) {
  res.locals.manifest = manifest;
  res.locals.entrypointJS = e => manifest.entrypoints[e].js || [];
  res.locals.entrypointCSS = e => manifest.entrypoints[e].css || [];
}

module.exports = outputPath => (req, res, next) => {
  if (env === 'production') {
    const manifest = require(path.join(outputPath, 'assets-manifest.json'));
    assignLocals(res, manifest);
    next();
  } else {
    const manifestPath = path.join(outputPath, 'assets-manifest.json');
    fs.readFile(manifestPath, 'utf8', (err, data) => {
      if (err) return next(err);

      const manifest = JSON.parse(data);
      assignLocals(res, manifest);
      next();
    });
  }
};
