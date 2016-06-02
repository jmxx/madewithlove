'use strict';

import gulp         from 'gulp';
import stylus       from 'gulp-stylus';
import browserSync  from 'browser-sync';
import browserify   from 'browserify';
import babelify     from 'babelify';
import source       from 'vinyl-source-stream';
import postStylus   from 'poststylus';
import sourcemaps   from 'gulp-sourcemaps';
import lost         from 'lost';
import autoprefixer from 'autoprefixer';
import stringify    from 'stringify';
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
    .on('error', function(err) {
      console.log(err);
      this.emit('end');
    })
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.public + '/css'))
    .pipe(browserSync.stream());
});

gulp.task('es6', () => {
  return browserify({
      entries: './resources/assets/js/index.js',
      debug: true
    })
    .transform(babelify)
    .transform(stringify, {
      appliesTo: { includeExtensions: ['.hjs', '.html', '.whatever'] }
    })
    .bundle()
    .on('error', function (err) {
      console.log(err);
      this.emit('end');
    })
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.public + '/js'));
});

function reload(done) {
  browserSync.reload();
  done();
}

gulp.task('watch:styles', () => {
  gulp.watch(paths.stylus, gulp.series('stylus'));
});

gulp.task('watch:es6', () => {
  gulp.watch(paths.js, gulp.series('es6', reload));
});

gulp.task('watch:html', () => {
  gulp.watch(paths.html, gulp.series(reload));
});

gulp.task('browserSync', (done) => {
  browserSync.init({
    proxy: 'http://mwl.dev'
  }, done);
});

gulp.task('watch', gulp.parallel('browserSync', 'watch:html', 'watch:styles', 'watch:es6'));

gulp.task('default', gulp.series('assets', 'watch'));
