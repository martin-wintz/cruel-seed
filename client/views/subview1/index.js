'use strict';

var View = require('../View');

var baseDir = '/views/';
var relativePath = __dirname.slice(baseDir.length, __dirname.length);
var subModules = [];

var view = new View(relativePath, subModules);
module.exports.ngModule = view.module;


module.exports.init = function (parentModule) {

  view.init(parentModule, require('./controller'));

};

