'use strict';

var angular = require('angular');
var namer = require('../../namer');


module.exports.ngModule = angular.module('views.subview1', []);

module.exports.init = function (parentModule) {
  _bindRoute(parentModule, module.exports.ngModule);

};

function _bindRoute(parentModule, module) {

  require('./controller')(module);

  parentModule.config(function ($stateProvider) {
    $stateProvider
      .state('views.subview1', {
        url: 'subview1',
        templateUrl: 'views/subview1/index.html',
        controller: namer.controller(module)
      });
  });

}



