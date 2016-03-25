'use strict';

var gulp = require('gulp')
  , stylus = require('gulp-stylus')
  , watch = require('gulp-watch')
  , browserSync = require('browser-sync').create()
  , browserify = require('browserify')
  , ngHtml2Js = require('browserify-ng-html2js')
  , source = require('vinyl-source-stream')
  , postStylus = require('poststylus')
  , sourcemaps = require('gulp-sourcemaps')
  , lost = require('lost')
  , autoprefixer = require('autoprefixer');

var paths = {
  public: './public',
  stylus: [
    './resources/assets/styl/**/*.styl'
  ],
  js: [
    './resources/assets/js/**/*.js',
    './resources/assets/js/**/*.html'
  ],
  html: [
    './app/**/*.php',
    './config/app.php',
    './resources/views/**/*.php'
  ]
};

gulp.task('assets', function() {
  gulp.src([
    './node_modules/angular-material/angular-material.css',
    './node_modules/animate.css/animate.css'
  ]).pipe(gulp.dest(paths.public + '/css'));
});

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
      entries: './resources/assets/js/app.js',
      debug: true
    })
    .transform(ngHtml2Js({
      baseDir: './resources/assets/js'
    }))
    .bundle()
    .on('error', function (err) {
      this.emit('end');
    })
    .pipe(source('app.js'))
    .pipe(gulp.dest(paths.public + '/js'));
});

gulp.task('watch', ['stylus', 'js'], function () {
  browserSync.init({
    proxy: 'mwl.dev'
  });

  watch(paths.stylus, function () {
    gulp.start('stylus');
  });

  watch(paths.html, function () {
    browserSync.reload();
  });

  watch(paths.js, function () {
    gulp.start('js', browserSync.reload);
  });

  // gulp.watch(paths.html).on('change', browserSync.reload);
  // gulp.watch(paths.js, ['js']).on('change', browserSync.reload);
});

gulp.task('default', ['assets', 'watch']);
