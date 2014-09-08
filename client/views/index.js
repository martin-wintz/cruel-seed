'use strict';

module.exports = function (app) {
  app.config(function ($stateProvider) {
    $stateProvider
      .state('app', {
        url: '/',
        views: 'index.html',
        controller: require('./controller')(app)
      });
  });
};

