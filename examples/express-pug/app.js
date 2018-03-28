const path = require('path');
const express = require('express');
const manifest = require('./build/packs/manifest.json');

const app = express();

console.log(manifest);

app.use('/packs', express.static(path.join(__dirname, 'build/packs')));

app.set('view engine', 'pug');

app.use((req, res, next) => {
  res.locals.manifest = manifest;
  res.locals.entrypointJS = e =>
    manifest.entrypoints[e].filter(x => x.match(/\.js$/)).map(x => manifest[x]);
  res.locals.entrypointCSS = e =>
    manifest.entrypoints[e]
      .filter(x => x.match(/\.css$/))
      .map(x => manifest[x]);

  next();
});

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/about', (req, res) => {
  res.render('about');
});

module.exports = app;
