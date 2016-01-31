'use strict';

var gulp = require('gulp')
  , stylus = require('gulp-stylus')
  , browserSync = require('browser-sync').create()
  , browserify = require('browserify')
  , source = require('vinyl-source-stream')
  , postStylus = require('poststylus')
  , sourcemaps = require('gulp-sourcemaps')
  , lost = require('lost')
  , autoprefixer = require('autoprefixer');

var paths = {
  public: './public',
  css: [
    './resources/assets/styl/**/*.styl'
  ],
  js: [
    './resources/assets/js/**/*.js'
  ],
  html: [
    './app/**/*.php',
    './config/app.php',
    './resources/views/**/*.php'
  ]
};


gulp.task('stylus', function () {
  gulp.src('./resources/assets/styl/app.styl')
    .pipe(sourcemaps.init())
    .pipe(stylus({
      use: [
        postStylus([lost, autoprefixer])
      ]
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.public + '/css'))
    .pipe(browserSync.stream());
});

gulp.task('js', function () {
  return browserify({
      entries: './resources/assets/js/main.js',
      debug: true
    })
    .bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest(paths.public + '/js'));
});

gulp.task('watch', ['stylus', 'js'], function () {
  browserSync.init({
    proxy: 'mwl.dev'
  });

  gulp.watch(paths.css, ['stylus']);
  gulp.watch(paths.html).on('change', browserSync.reload);
  gulp.watch(paths.js, ['js']).on('change', browserSync.reload);
});

gulp.task('default', ['watch']);
