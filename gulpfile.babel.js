'use strict';

import gulp         from 'gulp';
import stylus       from 'gulp-stylus';
import browserSync  from 'browser-sync';
import browserify   from 'browserify';
import ngHtml2Js    from 'browserify-ng-html2js';
import source       from 'vinyl-source-stream';
import postStylus   from 'poststylus';
import sourcemaps   from 'gulp-sourcemaps';
import lost         from 'lost';
import autoprefixer from 'autoprefixer';
import uglify       from 'gulp-uglify';
import buffer       from 'vinyl-buffer';

const paths = {
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

gulp.task('assets', () => {
  return gulp.src([
    './node_modules/angular-material/angular-material.css',
    './node_modules/animate.css/animate.css'
  ]).pipe(gulp.dest(paths.public + '/css'));
});

gulp.task('stylus', () => {
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

gulp.task('js', () => {
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
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(paths.public + '/js'));
});

function reload(done) {
  browserSync.reload();
  done();
}

gulp.task('watch:styles', () => {
  gulp.watch(paths.stylus, gulp.series('stylus'));
});

gulp.task('watch:js', () => {
  gulp.watch(paths.js, gulp.series('js', reload));
});

gulp.task('watch:html', () => {
  gulp.watch(paths.html, gulp.series(reload));
});

gulp.task('browserSync', (done) => {
  browserSync.init({
    proxy: 'http://mwl.dev'
  }, done);
});

gulp.task('watch', gulp.parallel('browserSync', 'watch:html', 'watch:styles', 'watch:js'));

gulp.task('default', gulp.series('assets', 'watch'));