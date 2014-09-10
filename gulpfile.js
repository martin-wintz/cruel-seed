'use strict';

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var clean = require('gulp-rimraf');
var browserify = require('gulp-browserify');

var paths = {
  src: {
    markupIndex: 'client/index.html',
    markup: 'client/**/*.html',
    logicIndex: 'client/index.js',
    logic: 'client/**/*.js'
  },
  build: 'build',
  lib: 'build/lib',
  server: 'server/index.js'
};


gulp.task('clean', function () {
  return gulp.src(paths.build).pipe(clean());
});

gulp.task('build-markup', ['clean'], function () {
  return gulp.src(paths.src.markupIndex).pipe(gulp.dest(paths.build));
});

gulp.task('build-logic', ['clean'], function () {
  return gulp.src(paths.src.logicIndex)
    .pipe(browserify({
      debug: true
    }))
    .pipe(gulp.dest(paths.lib));
});

gulp.task('watch', function () {
  gulp.watch(paths.src.logic, ['build']);
  gulp.watch(paths.src.markup, ['build']);
});

gulp.task('build', ['build-markup', 'build-logic']);


gulp.task('local', ['build'], function () {
  nodemon({
    script: paths.server,
    ext: 'js'
  });
});


gulp.task('default', ['build', 'local', 'watch']);

