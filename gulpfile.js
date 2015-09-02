var gulp = require('gulp');
var webpack = require('gulp-webpack');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var del = require('del');

var ENTRY = 'lib/index.js';
var SRC = 'lib/**';
var DIST = 'dist/';
var NAME = 'Yolk';
var OUTPUT = NAME + '.js';

var config = {
  module: {
    loaders: [
      {
        test: /\.js/,
        exclude: [/node_modules/],
        loaders: ['babel?stage=0']
      }
    ]
  },
  output: { library: NAME, libraryTarget: 'umd' },
  resolve: {
    extensions: ['', '.js'],
    modulesDirectories: ['node_modules', 'lib']
  }
};

gulp.task('clean', function (cb) {
  return del.sync(DIST, cb());
});

gulp.task('build.full', function () {
  return gulp.src(ENTRY)
    .pipe(webpack(config))
    .pipe(concat(OUTPUT))
    .pipe(gulp.dest(DIST));
});

gulp.task('build.min', ['build.full'], function () {
  return gulp.src(DIST + OUTPUT)
    .pipe(uglify())
    .pipe(concat(NAME+'.min.js'))
    .pipe(gulp.dest(DIST));
});

gulp.task('build.watch', ['build.full'], function () {
  return gulp.watch(SRC, ['build.full']);
});

gulp.task('default', ['build.full', 'build.min']);
