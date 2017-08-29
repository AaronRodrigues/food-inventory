"use strict";

const express = require('express');
const router = express.Router();
const dbHelper = require('../config/dbHelpers');
const appRootPath = require('app-root-path');


/**
 * All routes will start '/api' because of the middleware path setup in app.js
 */ 

router.get('/get', (req, res) => {
  dbHelper.findOne(req.query).then( items => {
    res.json(items);
  }).catch( e => {
    res.status(400).json('Request failed');
  });
});

router.get('/getAll', (req, res) => {
  dbHelper.findMultiple(req.query).then( items => {
    res.json(items);
  }).catch( e => {
    res.status(400).json('Request failed');
  });
});

router.post('/post', (req, res) => {
  dbHelper.addOne(req.body).then( item => {
    res.json(item);
  }).catch( e => {
    res.status(400).json('Request failed');
  });
});

router.put('/put', (req, res) => {
  dbHelper.modifyOne(req.body)
    .then( response => {
      res.json('success');
    });
});

router.delete('/delete', (req, res) => {
  dbHelper.deleteOne(req.query).then( removed => {
    res.json(removed);
  }).catch( e => {
    res.json(e);
  });
});



module.exports = router;