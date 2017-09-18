import path from 'path';
import React from 'react';
import express from 'express';
import { StaticRouter } from 'react-router';
import ReactDOMServer from 'react-dom/server';
import App from './app';

const manifest = require(process.env.MANIFEST_PATH);
const app = express();

console.log(manifest);

app.use('/packs', express.static(path.join(__dirname, 'packs')));

app.get('*', (req, res) => {
  const context = {};

  const html = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  );

  if (context.url) {
    res.redirect(context.url);
  } else {
    res.send(`
      <!doctype html>
      <html>
        <head><title>test</title></head>
      <body>
        <div id="app">${html}</div>
        <script src="${manifest['manifest.js']}"></script>
        <script src="${manifest['vendor.js']}"></script>
        <script src="${manifest['app.js']}"></script>
      </body>
      </html>
    `);
  }
});

app.listen(4000, () => console.log('listening on 4000'));
