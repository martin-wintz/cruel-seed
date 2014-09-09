'use strict';

var namer = require('../namer');

module.exports = function (module) {

  module.controller(namer.controller(module), function ($scope) {
    console.log('in controller');
    $scope.helloWord = 'Hello World';
  });

};
