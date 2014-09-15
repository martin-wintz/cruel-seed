'use strict';

var express = require('express');
var path = require('path');
var config = require('../config');
var root = path.join(__dirname, '../..');
var compression = require('compression');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var serveStatic = require('serve-static');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');


module.exports.initialize = function () {

  var app = express();

  app.use(compression());

  app.use(cookieParser());

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use(methodOverride());

  app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: config.sessionSecret
  }));


  app.set('views', path.join(root, 'build'));
  app.engine('html', require('ejs').renderFile);

  app.use('/lib', serveStatic(path.join(root, 'build', 'lib')));
  app.use(function (req, res) {
    res.render('index.html');
  });


  app.listen(3000);


  return app;

};
