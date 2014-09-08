var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task('local', function () {
  nodemon({
    script: 'server/index.js',
    ext: 'js'
  });
});

gulp.task('default', ['local']);

