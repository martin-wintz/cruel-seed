'use strict';

var angular = require('angular');
var namer = require('../namer');

var subview1 = require('./subview1');

var dependencies = [
  subview1.ngModule.name
];

module.exports.ngModule = angular.module('views', dependencies);


subview1.init(module.exports.ngModule);


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



