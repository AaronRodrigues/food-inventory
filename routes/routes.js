"use strict";
const appRootPath = require('app-root-path');

module.exports = (app, passport) => {
  app.get('/', (req,res) => {
    res.redirect('/login');
  });

  app.get('/login', (req, res) => {
    res.sendFile(appRootPath + '/views/signin.html');
  });

  // app.get('/signup', (req,res) => {
  //   res.sendFile(appRootPath + '/views/signup.html');
  // });

  // app.post('/signup', passport.authenticate('local-signup', {
  //   successRedirect : '/app', 
  //   failureRedirect : '/signup'
  // }));

  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/app',
    failureRedirect: '/login'
  }));

  app.get('/app*', isLoggedIn, (req, res) => {
    res.sendFile(appRootPath + '/dist/app.html');
  });

}

const isLoggedIn = (req,res,next) => {
  if(req.isAuthenticated()) {
    return next();
  }

  res.redirect('/login');
}