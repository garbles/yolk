const _package = require(`./package.json`)
const gulp = require(`gulp`)
const concat = require(`gulp-concat`)
const mocha = require(`gulp-mocha`)
const eslint = require(`gulp-eslint`)
const del = require(`del`)
const webpackStream = require(`webpack-stream`)
const webpackConfig = require(`./webpack.config`)
const webpackConfigMin = require(`./webpack.config.min`)
const mochaConfig = require(`./mocha.config`)

const SRC = `lib/**`
const DIST = `dist`
const TEST_EXAMPLES = `test/examples/*-test.js`
const TEST_UNIT = `test/unit/*-test.js`
const TEST = [TEST_EXAMPLES, TEST_UNIT]
const CONFIG = [`*.config.*`, `gulpfile.js`]

gulp.task(`clean`, cb => del.sync(DIST, cb()))

gulp.task(`build`, () => {
  return gulp.src(_package.main)
    .pipe(webpackStream(webpackConfig))
    .pipe(concat(`${_package.name}.js`))
    .pipe(gulp.dest(DIST))
})

gulp.task(`build.min`, () => {
  return gulp.src(_package.main)
    .pipe(webpackStream(webpackConfigMin))
    .pipe(concat(`${_package.name}.min.js`))
    .pipe(gulp.dest(DIST))
})

gulp.task(`lint.source`, () => {
  return gulp.src(SRC)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError())
})

gulp.task(`lint.test`, () => {
  return gulp.src(TEST)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError())
})

gulp.task(`lint.config`, () => {
  return gulp.src(CONFIG)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError())
})

gulp.task(`test.source`, [`lint.source`, `lint.test`], () => {
  return gulp.src([`test/setup.js`, `test/source.js`].concat(TEST))
    .pipe(mocha(mochaConfig))
})

gulp.task(`test.watch`, [`test.source`], () => gulp.watch(TEST.concat(SRC), [`test.source`]))

gulp.task(`test.prerelease`, [`build`, `test.source`], () => {
  return gulp.src([`test/setup.js`, `test/release.js`, TEST_EXAMPLES])
    .pipe(mocha(mochaConfig))
    .once(`error`, () => process.exit(1))
})

gulp.task(`test.prerelease.min`, [`build.min`, `test.prerelease`], () => {
  return gulp.src([`test/setup.js`, `test/release.min.js`, TEST_EXAMPLES])
    .pipe(mocha(mochaConfig))
    .once(`error`, () => process.exit(1))
})

gulp.task(`lint.full`, [`lint.source`, `lint.test`, `lint.config`])
gulp.task(`build.full`, [`lint.full`, `clean`], () => gulp.start(`build`, `build.min`))
gulp.task(`test.full`, [`build.full`], () => gulp.start(`test.prerelease`, `test.prerelease.min`))
gulp.task(`prerelease`, [`test.full`])
