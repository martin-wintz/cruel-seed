'use strict';

var angular = require('angular');


module.exports.ngModule = angular.module('views', []);

module.exports.init = function (app) {

  app.config(function ($locationProvider) {
    $locationProvider.html5Mode(true);
  });

  require('./controller')(module.exports.ngModule);

  app.config(function ($stateProvider) {
    $stateProvider
      .state('app', {
        url: '/test',
        templateUrl: 'index.html',
        controller: 'TestController'
      });
  });

};



