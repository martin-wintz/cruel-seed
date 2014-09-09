'use strict';

var express = require('express');
var path = require('path');

var root = path.join(__dirname, '../..');

module.exports.initialize = function () {
  var app = express();

  app.set('views', path.join(root, 'build'));
  app.engine('html', require('ejs').renderFile);

  app.use('/lib', express.static(path.join(root, 'build', 'lib')));
  app.use(function (req, res) {
    res.render('index.html');
  });

  app.listen(3000);

  return app;
};
