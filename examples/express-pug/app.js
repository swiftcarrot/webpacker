const fs = require('fs');
const path = require('path');
const express = require('express');

const env = process.env.NODE_ENV || 'development';
const app = express();

app.use('/packs', express.static(path.join(__dirname, 'build/packs')));
app.set('view engine', 'pug');

app.use((req, res, next) => {
  if (env === 'production') {
    const manifest = require('./build/packs/manifest.json');

    res.locals.manifest = manifest;
    res.locals.entrypointJS = e => manifest.entrypoints[e].js || [];
    res.locals.entrypointCSS = e => manifest.entrypoints[e].css || [];

    next();
  } else {
    const manifestPath = path.join(__dirname, 'build/packs/manifest.json');
    fs.readFile(manifestPath, 'utf8', (err, data) => {
      if (err) return next(err);
      const manifest = JSON.parse(data);

      res.locals.manifest = manifest;
      res.locals.entrypointJS = e => manifest.entrypoints[e].js || [];
      res.locals.entrypointCSS = e => manifest.entrypoints[e].css || [];

      next();
    });
  }
});

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/about', (req, res) => {
  res.render('about');
});

module.exports = app;
