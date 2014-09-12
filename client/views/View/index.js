'use strict';

var angular = require('angular');
var namer = require('../../namer');
var path = require('path');
var _ = require('lodash');

// A ui-router view
// @params:
//   parentModule: (anglar.Module) the parent angular.module
//   subModules: ([angular.Module]) list of submodule dependencies
//   relativePath: (String) the relative path of the view
//   relativePath: (Controller) the controller for the view
var View = module.exports = function (relativePath, subModules) {

  this.subModules = subModules;
  this.relativePath = relativePath;
  this.module = angular.module(
    _generateStateName(relativePath),
    _getNames(subModules)
  );

};


View.prototype.init = function (parentModule, controller) {

  this.parentModule = parentModule;
  this.controller = controller;

  _bindRoute(this.parentModule, this.module, this.relativePath, this.controller);
  _initSubviews(this.module, this.subModules);

};


function _getNames(modules) {
  return _.map(modules, function (module) {
    return module.ngModule.name;
  });
}


function _bindRoute(app, module, relativePath, controller) {

  controller(module);

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

  var relativePathComponents = _.without(relativePath.split('/'), '');
  relativePathComponents = ['views'].concat(relativePathComponents);
  return relativePathComponents.join('.');

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


function _initSubviews(module, subModules) {
  subModules.forEach(function (subModule) {
    subModule.init(module);
  });
}

