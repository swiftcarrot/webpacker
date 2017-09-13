import path from 'path';
import express from 'express';

const manifest = require(process.env.MANIFEST_PATH);
const app = express();

console.log(manifest);

app.use('/packs', express.static(path.join(__dirname, 'packs')));

app.use((req, res, next) => {
  res.locals.manifest = manifest;
  res.render = name => {
    const template = require('./views/' + name + '.pug');
    const html = template(res.locals);
    res.send(html);
  };
  next();
});

app.get('/', (req, res) => {
  res.render('index');
});

export default app;
