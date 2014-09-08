var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var del = require('del');
var browserify = require('gulp-browserify');

var paths = {
  markup: 'client/index.html',
  logic: 'client/index.js',
  build: 'build',
  server: 'server/index.js'
};

gulp.task('local', function () {
  nodemon({
    script: paths.server,
    ext: 'js'
  });
});

gulp.task('build-markup', function () {
  gulp.src(paths.markup).pipe(gulp.dest(paths.build));
});

gulp.task('build-logic', function () {
  gulp.src(paths.logic)
    .pipe(browserify({
      transform: ['debowerify']
    }))
    .pipe(gulp.dest(paths.build));
});

gulp.task('clean', function (callback) {
  del(['build'], callback);
});

gulp.task('default', ['local']);

