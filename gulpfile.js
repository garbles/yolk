const gulp = require(`gulp`)
const webpack = require(`webpack`)
const webpackStream = require(`webpack-stream`)
const uglify = require(`gulp-uglify`)
const concat = require(`gulp-concat`)
const mocha = require(`gulp-mocha`)
const babel = require(`babel/register`)
const del = require(`del`)

const ENTRY = `lib/index.js`
const SRC = `lib/**`
const TEST = `test/**/*-test.js`
const DIST = `dist/`
const NAME = `Yolk`
const OUTPUT = NAME + `.js`

const mochaConfig = {
  compilers: {
    js: babel
  },
  growl: true
}

const webpackConfig = {
  module: {
    loaders: [
      {
        test: /\.js/,
        exclude: [/node_modules/],
        loaders: [`babel`]
      }
    ]
  },
  externals: {
    rx: `Rx`
  },
  output: { library: NAME, libraryTarget: `umd` },
  resolve: {
    extensions: [``, `.js`],
    modulesDirectories: [`node_modules`, `lib`]
  }
}

gulp.task(`clean`, function (cb) {
  return del.sync(DIST, cb())
})

gulp.task(`build.full`, function () {
  return gulp.src(ENTRY)
    .pipe(webpackStream(webpackConfig))
    .pipe(concat(OUTPUT))
    .pipe(gulp.dest(DIST))
})

gulp.task(`build.min`, [`build.full`], function () {
  return gulp.src(DIST + OUTPUT)
    .pipe(uglify())
    .pipe(concat(NAME+`.min.js`))
    .pipe(gulp.dest(DIST))
})

gulp.task(`build.watch`, [`build.full`], function () {
  return gulp.watch(SRC, [`build.full`])
})

gulp.task(`test`, function () {
  return gulp.src([`test/setup.js`, TEST])
    .pipe(mocha(mochaConfig))
})

gulp.task(`test.watch`, [`test`], function () {
  return gulp.watch([TEST, SRC], [`test`])
})

gulp.task(`default`, [`build.full`, `build.min`])
