'use strict';

var namer = require('../namer');

module.exports = function (module) {

  module.controller(namer.controller(module), function ($scope) {
    $scope.helloWorld = 'Hello World';
  });

};
