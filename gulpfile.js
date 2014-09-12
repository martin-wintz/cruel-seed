'use strict';

var gulp = require('gulp');
var path = require('path');

var nodemon = require('gulp-nodemon');
var clean = require('gulp-rimraf');
var browserify = require('gulp-browserify');
var templateCache = require('gulp-angular-templatecache');
var livereload = require('gulp-livereload');
livereload.listen();

var paths = {
  src: {
    markupIndex: 'client/index.html',
    markup: 'client/**/*.html',
    logicIndex: 'client/index.js',
    logic: 'client/**/*.js'
  },
  tmp: '.tmp',
  build: 'build',
  lib: 'build/lib',
  server: 'server/index.js'
};


gulp.task('clean', function () {

  return gulp.src(paths.build).pipe(clean());

});


gulp.task('build-markup', ['clean'], function () {

  gulp.src(paths.src.markupIndex).pipe(gulp.dest(paths.build));

});


gulp.task('build-templates', ['clean'], function () {

  return gulp.src(paths.src.markup)
    .pipe(templateCache({ module: 'app' }))
    .pipe(gulp.dest(paths.lib))
    .pipe(livereload());

});


gulp.task('build-logic', ['clean'], function () {

  return gulp.src(paths.src.logicIndex)
    .pipe(browserify({
      basedir: './client',
      debug: true
    }))
    .pipe(gulp.dest(paths.lib))
    .pipe(livereload());

});


gulp.task('watch', function () {

  gulp.watch(paths.src.logic, ['build']);
  gulp.watch(paths.src.markup, ['build']);

});


gulp.task('build', ['build-markup', 'build-logic', 'build-templates']);


gulp.task('local', ['build'], function () {

  nodemon({
    script: paths.server,
    ext: 'js'
  });

});


gulp.task('default', ['build', 'local', 'watch']);

