var gulp       = require('gulp');
var source     = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify   = require('watchify');
var reactify   = require('reactify');

gulp.task('watch', function() {
  var watcher = watchify(browserify({
    entries: ['./src/jsx/app.jsx'],
    transform: [reactify],
    debug: true,
    fullPaths: true
  }));

  return watcher.on('update', function() {
    watcher.bundle()
      .pipe(source('./src/js/app.js'))
      .pipe(gulp.dest('.'));
    console.log('Updated');
  })
  .bundle()
  .pipe(source('./src/js/app.js'))
  .pipe(gulp.dest('.'));
});

gulp.task('default', ['watch']);
