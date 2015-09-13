const package = require(`./package.json`)
const gulp = require(`gulp`)
const concat = require(`gulp-concat`)
const mocha = require(`gulp-mocha`)
const del = require(`del`)
const webpackStream = require(`webpack-stream`)
const webpackConfig = require(`./webpack.config`)
const webpackConfigMin = require(`./webpack.config.min`)
const mochaConfig = require(`./mocha.config`)

const SRC = `lib`
const DIST = `dist`
const TEST_EXAMPLES = `test/examples/*-test.js`
const TEST_UNIT = `test/unit/*-test.js`
const TEST = [TEST_EXAMPLES, TEST_UNIT]

gulp.task(`clean`, cb => del.sync(DIST, cb()))

gulp.task(`build`, [`clean`], () => {
  return gulp.src(package.main)
    .pipe(webpackStream(webpackConfig))
    .pipe(concat(`${package.name}.js`))
    .pipe(gulp.dest(DIST))
})

gulp.task(`build.min`, [`clean`], () => {
  return gulp.src(package.main)
    .pipe(webpackStream(webpackConfigMin))
    .pipe(concat(`${package.name}.min.js`))
    .pipe(gulp.dest(DIST))
})

gulp.task(`test.source`, () => {
  return gulp.src([`test/setup.js`, `test/source.js`].concat(TEST))
    .pipe(mocha(mochaConfig))
})

gulp.task(`test.watch`, [`test.source`], () => gulp.watch(TEST.concat(`${SRC}/**`), [`test.source`]))

gulp.task(`test.prerelease`, [`build`, `test.source`], () => {
  return gulp.src([`test/setup.js`, `test/release.js`, TEST_EXAMPLES])
    .pipe(mocha(mochaConfig))
    .once('error', () => process.exit(1))
})

gulp.task(`test.prerelease.min`, [`build.min`, `test.prerelease`], () => {
  return gulp.src([`test/setup.js`, `test/release.min.js`, TEST_EXAMPLES])
    .pipe(mocha(mochaConfig))
    .once('error', () => process.exit(1))
})

gulp.task(`build.full`, [`build`, `build.min`])
gulp.task(`test.full`, [`build.full`, `test.prerelease`, `test.prerelease.min`])
gulp.task(`prerelease`, [`build.full`, `test.full`])
