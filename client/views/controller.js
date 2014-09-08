'use strict';

module.exports = function (app) {
  app.controller('index', function ($scope) {
    $scope.helloWord = 'Hello World';
  });
};
