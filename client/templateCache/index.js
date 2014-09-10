'use strict';

var findit = require('findit');
var fs = require('fs');
var path = require('path');


var ALREADY_INITIALIZED_ERROR = new Error('Template already initialized. Can only be initialized once.');
var initialized = false;
var app;


module.exports.init = function (dir, _app, callback) {

  app = _app;
  if (initialized) return callback(ALREADY_INITIALIZED_ERROR);
  _registerTemplates(dir, callback);

};



function _registerTemplates(dir, callback) {

  var finder = findit(dir);

  finder.on('file', _processFile);
  finder.on('end', function () { initialized = true; });
  finder.on('error', function (err) { callback(err); });

}


function _processFile(file) {

  if (_isTemplate(file)) {
    _registerTemplate(file);
  }

}


function _registerTemplate(templatePath) {

  app.run(function($templateCache) {
    var contents = fs.readFileSync(path.join('../', templatePath), 'utf8');
    $templateCache.put(
      templatePath,
      contents
    );
  });

}


function _isTemplate(filePath) {

  return filePath.slice(filePath.length - 5, filePath.length) === '.html';

}


