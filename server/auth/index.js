'use strict';

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/User');

passport.use(new LocalStrategy(
  { usernameField: 'email' },

  function(email, password, done) {

    User
      .findOne({ email: email })
      .select('email', 'password')
      .exec(_authenticateUser(email, password, done));

  }

));


function _authenticateUser(email, password, callback) {

  return function(err, user) {
    if (err) { return callback(err); }

    // TODO: use proper errors instead of objects
    if (!user) {
      return callback(null, false, { message: 'Incorrect username.' });
    }

    if (!user.validatePassword(password)) {
      return callback(null, false, { message: 'Incorrect password.' });
    }

    user.makeSafe();
    return callback(null, user);

  };

}

