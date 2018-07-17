const fs = require('fs');
const path = require('path');
const env = process.env.NODE_ENV || 'development';

module.exports = packs => (req, res, next) => {
  if (env === 'production') {
    const manifest = require(path.join(packs, 'assets-manifest.json'));

    res.locals.manifest = manifest;
    res.locals.entrypointJS = e => manifest.entrypoints[e].js || [];
    res.locals.entrypointCSS = e => manifest.entrypoints[e].css || [];

    next();
  } else {
    const manifestPath = path.join(packs, 'assets-manifest.json');
    fs.readFile(manifestPath, 'utf8', (err, data) => {
      if (err) return next(err);
      const manifest = JSON.parse(data);

      res.locals.manifest = manifest;
      res.locals.entrypointJS = e => manifest.entrypoints[e].js || [];
      res.locals.entrypointCSS = e => manifest.entrypoints[e].css || [];

      next();
    });
  }
};
