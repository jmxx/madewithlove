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
  return gulp.src([
    './node_modules/angular-material/angular-material.css',
    './node_modules/animate.css/animate.css'
  ]).pipe(gulp.dest(paths.public + '/css'));
});

gulp.task('stylus', function () {
  return gulp.src('./resources/assets/styl/app.styl')
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

gulp.task('watch:styles', function () {
  gulp.watch(paths.stylus, gulp.series('stylus'));
});

gulp.task('watch:js', function () {
  gulp.watch(paths.js, gulp.series('js', browserSync.reload));
});

gulp.task('watch:html', function () {
  gulp.watch(paths.html, gulp.series(browserSync.reload));
});

gulp.task('browserSync', function(done) {
  browserSync.init({
    proxy: 'http://192.168.1.201:8000'
  }, done);
});

gulp.task('watch', gulp.parallel('browserSync', 'watch:html', 'watch:styles', 'watch:js'));

gulp.task('default', gulp.series('assets', 'watch'));
