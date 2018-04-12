const path = require('path');
const express = require('express');

const app = express();

app.use('/packs', express.static(path.join(__dirname, 'build/packs')));
app.set('view engine', 'pug');

app.use(require('../../manifest')(path.join(__dirname, 'build/packs')));

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/about', (req, res) => {
  res.render('about');
});

module.exports = app;
