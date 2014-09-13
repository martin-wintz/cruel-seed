'use strict';

var angular = require('angular');

var views = require('./views');


var dependencies = [
  require('angular-ui-router'),
  views.ngModule.name
];


var app = angular.module('app', dependencies);
_setHTML5Mode(app);
views.init(app);

function _setHTML5Mode(app) {

  app.config(function ($locationProvider) {
    $locationProvider.html5Mode(true);
  });

}

