'use strict';

const express = require('express');
const path = require('path');
const instagram = require('./modules/instagram');
const app = express();

app.get('/api/userInfo', (req, res) => instagram.userInfo(req, res));
app.get('/api/allMedia', (req, res) => instagram.allMedia(req, res));
app.get('/api/authenticate', (req, res) => instagram.authenticate(req, res));

app.use('/', express.static(path.join(__dirname + '/../public/')));
app.use('/*', express.static(path.join(__dirname + '/../public/index.html')));

app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port ' + (process.env.PORT || 3000));
});
