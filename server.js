// server.js
const express = require("express");
const { h } = require("preact");
const render = require("preact-render-to-string");
const path = require("path");

const { App } = require("./src/App");

const { getOpenAIResponse } = require('./root');

import Router from './src/router';

const app = express();

const HTMLShell = (html) => `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.6.2/css/bulma.min.css">
        <title> SSR Preact App </title>
      </head>
      <body>
        <div id="app">${html}</div>
        <script src="./app.js"></script>
      </body>
    </html>`;

app.use(express.static(path.join(__dirname, "dist")));

app.get('/', (req, res) => {
  let html = render(
    <Router />
  )
  res.send(HTMLShell(html))
})

app.get('/createcompletion', async (req, res) => {
  const resp = await getOpenAIResponse(req, res);
  res.send(resp);
})

app.listen(3000);