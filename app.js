"use strict";

const express = require('express');
const bodyParser = require('body-parser');

const router = require(__dirname + '/routes/routes');

const app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/dist'));

/**
 * Middleware
 */
// Parse any JSON content in request body if available
app.use(bodyParser.json());
// Parse any 'POST' data in the request body if available
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.sendFile(appRootPath + '/dist/index.html');
});

// Set the middleware path to be '/api'
app.use('/api', router);

module.exports = app;