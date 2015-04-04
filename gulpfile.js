var gulp       = require('gulp');
var source     = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify   = require('watchify');
var reactify   = require('reactify');

gulp.task('watch', function() {
  var watcher = watchify(browserify({
    entries: ['./index.js'],
    transform: [reactify],
    debug: true,
    fullPaths: true
  }));

  return watcher.on('update', function() {
    watcher.bundle()
        .pipe(source('build.js'))
        .pipe(gulp.dest('.'));
    console.log('Updated');
  })
  .bundle()
  .pipe(source('build.js'))
  .pipe(gulp.dest('.'));
});

gulp.task('default', ['watch']);
