const localStrategy = require('passport-local').Strategy;

const User = require('../models/User.js');

module.exports = (passport) => {
  passport.serializeUser( (user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser( (id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  passport.use('local-signup', new localStrategy({
    // by default, local strategy uses username and password, override with email
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true // pass back the entire request to the callback
  },
  (req, email, password, done) => {
    process.nextTick( () => {
      User.findOne({ 'local.email': email}, (err, user) => {
        if (err) return done(err);
        if (user) return done(null, false)
        
        const newUser = new User();

        newUser.local.email = email;
        newUser.local.password = newUser.generateHash(password);

        newUser.save( err => {
          if (err) throw err;
          return done(null, newUser);
        });
      });
    });
  }));

  passport.use('local-login', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  (req, email, password, done) => {
    User.findOne({'local.email': email}, (err ,user) => {
      if (err) {
        return done(err);
      }
      
      if(!user) {
        return done(null, false, 'no user found');
      }

      if(!user.validPassword(password)) {
        return done(null, false, 'Wrong password');
      }

      return done(null, user);
    });
  }));
}