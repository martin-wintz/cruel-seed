'use strict';

var angular = require('angular');
var namer = require('../namer');


module.exports.ngModule = angular.module('views', []);

module.exports.init = function (app) {

  _setHTML5Mode(app);
  _bindRoute(app, module.exports.ngModule);

};


function _setHTML5Mode(app) {

  app.config(function ($locationProvider) {
    $locationProvider.html5Mode(true);
  });

}

function _bindRoute(app, module) {

  require('./controller')(module);

  app.config(function ($stateProvider) {
    $stateProvider
      .state('app', {
        url: '/',
        templateUrl: 'views/index.html',
        controller: namer.controller(module)
      });
  });

}



