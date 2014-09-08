'use strict';

var angular = require('angular');

var dependencies = [
  'ui.router'
];

var app = _initializeApp(dependencies);
require('./views')(app);


function _initializeApp(dependencies) {
  return angular.module('app', dependencies);
}


