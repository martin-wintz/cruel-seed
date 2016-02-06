'use strict';

var passport = require('passport');

module.exports.bindRoutes = function (app) {

  app.post(
    '/login',
    passport.authenticate(
      'local',
      { successRedirect: '/', failureRedirect: '/login' }
    )
  );

};
