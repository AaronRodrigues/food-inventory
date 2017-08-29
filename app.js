"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const morgan = require('morgan');
const appRootPath = require('app-root-path');

const apiRouter = require(__dirname + '/routes/apiRoutes');
const configDB = require('./config/config.json');

mongoose.connect(configDB.dbs.inventory.url, {
  useMongoClient: true
});

const passport = require('passport');
require('./config/passport')(passport);

const app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/dist'));
app.use(express.static(__dirname + '/views'));

/**
 * Middleware
 */
app.use(bodyParser.json()); // Parse any JSON content in request body if available
app.use(bodyParser.urlencoded({extended: true})); // Parse any 'POST' data in the request body if available
app.use(cookieParser()); // Read cookies
app.use(morgan('dev')); // log every request to the console

/**
 * Passport config
 */
app.use(session({secret: ''})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistant login sessions

require('./routes/routes.js')(app,passport);

// Set the api path to be '/api'
app.use('/api', apiRouter);

module.exports = app;