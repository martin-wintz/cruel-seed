'use strict';

var path = require('path');
var View = require('./View');

var view;
var relativePath = path.relative(__dirname, '/views');
var subModules = [
  require('./subview1')
];

view = new View(relativePath, subModules);
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



