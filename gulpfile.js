'use strict';

var opts = require('yargs')
  .option('sourcemaps', { default: true })
  .argv;

var path    = require('path')
var wiredep = require('wiredep');
var gulp    = require('gulp');
var $       = require('gulp-load-plugins')({
  rename: { 'gulp-if': 'gif' }
});

// Don't concatenate jQuery and Bootstrap with our JS.
var js_src = wiredep({
  exclude: [ 'jquery.js', 'bootstrap' ]
}).js;

// Wrap the src function with plumber for easy error handling.
gulp._src = gulp.src;
gulp.src = function() {
  return gulp._src.apply(gulp, arguments).pipe($.plumber());
};

gulp.task('sass', function() {
  gulp.src('./assets/scss/**/*.scss')
    .pipe($.gif(opts.sourcemaps, $.sourcemaps.init()))
      .pipe($.sass({
        includePaths: './assets/vendor',
      }))
    .pipe($.gif(opts.sourcemaps, $.sourcemaps.write('.')))
    .pipe(gulp.dest('./static/css'));
});
gulp.task('sass:watch', function() { gulp.watch('./assets/scss/**/*.scss', ['sass']); });

// Move bower packages to static.
gulp.task('bower', function() {
  var overrides = { "jquery": { "main": ["dist/jquery.min.js"] } };
  var whitelist = [ 'jquery' ];
  var packages  = wiredep({ overrides: overrides }).packages;
  Object.keys(packages).forEach(function(asset) {
    if (whitelist.indexOf(asset) === -1) return;

    var src = packages[asset].main
    gulp.src(src, { base: path.dirname(src) })
      .pipe(gulp.dest('./static/js'));
  });
});

gulp.task('js', function() {
  gulp.src(js_src.concat('./assets/js/**/*.js'))
    .pipe($.gif(opts.sourcemaps, $.sourcemaps.init()))
      .pipe($.concat('main.js'))
    .pipe($.gif(opts.sourcemaps, $.sourcemaps.write('.')))
    .pipe($.jshint())
    .pipe($.jshint.reporter('default'))
    .pipe(gulp.dest('./static/js'));
});
gulp.task('js:watch', function() { gulp.watch('./assets/js/**/*.js', ['js']); });

gulp.task('all', ['bower', 'sass', 'js']);
gulp.task('watch', ['bower', 'sass:watch', 'js:watch']);
gulp.task('default', ['all']);
