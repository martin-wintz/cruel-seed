'use strict';

var angular = require('angular');
var namer = require('../../namer');


module.exports.ngModule = angular.module('views.subview1', []);

module.exports.init = function (parentModule) {
  console.log('init subview');

  _bindRoute(parentModule, module.exports.ngModule);

};

function _bindRoute(app, module) {

  require('./controller')(module);

  app.config(function ($stateProvider) {
    $stateProvider
      .state('app.subview1', {
        url: 'subview1',
        templateUrl: 'views/subview1/index.html',
        controller: namer.controller(module)
      });
  });

}



