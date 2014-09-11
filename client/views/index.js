'use strict';

var angular = require('angular');
var namer = require('../namer');
var path = require('path');

var subview1 = require('./subview1');
var relativePath = path.relative(__dirname, '/views');

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
      .state(_generateStateName(relativePath), {
        url: _generateRelativeUrl(relativePath),
        templateUrl: _getTemplateUrl(relativePath),
        controller: namer.controller(module)
      });
  });

}


function _generateStateName(relativePath) {

  var relativePathComponents = relativePath.split('/');
  relativePathComponents = ['views'].concat(relativePathComponents);
  var viewName = relativePathComponents.join('.');
  return viewName.slice(0, viewName.length - 1);

}


function _generateRelativeUrl(relativePath) {

  if (relativePath.length === 0) {
    return '/';
  } else {
    return relativePath;
  }

}


function _getTemplateUrl(relativePath) {

  return path.join('views/', relativePath, 'index.html');

}



