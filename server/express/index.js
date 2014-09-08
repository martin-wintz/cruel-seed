'use strict';

var express = require('express');

module.exports.initialize = function () {
  var app = express();

  app.get('/', function(req, res){
    res.send('hello world');
  });

  app.listen(3000);

  return app;
};
