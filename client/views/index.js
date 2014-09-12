'use strict';

var View = require('./View');

var baseDir = '/views/';
var relativePath = __dirname.slice(baseDir.length, __dirname.length);
var subModules = [
  require('./subview1')
];


var view = new View(relativePath, subModules);
module.exports.ngModule = view.module;


module.exports.init = function (app) {

  _setHTML5Mode(app);
  view.init(app, require('./controller'));

};


function _setHTML5Mode(app) {

  app.config(function ($locationProvider) {
    $locationProvider.html5Mode(true);
  });

}

