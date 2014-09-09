'use strict';

var angular = require('angular');

var views = require('./views');


var dependencies = [
  require('angular-ui-router'),
  views.ngModule.name
];


var app = angular.module('app', dependencies);

views.init(app);

