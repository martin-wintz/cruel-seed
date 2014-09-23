'use strict';

var fs = require('fs');
var _ = require('lodash');

module.exports.bindRoutes = function (app) {

  var files = _.without(fs.readdirSync(__dirname), 'index.js');

  _.each(files, function (file) {
    require('./' + file).bindRoutes(app);
  });

};

