'use strict';

var angular = require('angular');

var templateCache = require('./templateCache');
var views = require('./views');


var dependencies = [
  require('angular-ui-router'),
  views.ngModule.name
];


var app = angular.module('app', dependencies);

templateCache.init(__dirname, app, function () {
  if (err) { throw err; }

  views.init(app);
});

