const webpackConfig = require(`./webpack.config.test`)

module.exports = config => {
  const options = {
    basePath: ``,

    frameworks: [`mocha`, `chai`],

    browsers: [`Chrome`, `Firefox`],

    files: [`src/**/*.test.js`],

    preprocessors: {
      'src/**/*.test.js': [`webpack`],
    },

    colors: true,

    webpack: webpackConfig,

    webpackMiddleware: {
      noInfo: true,
    },

    eslint: {
      stopOnError: true,
      stopOnWarning: true,
    },

    reporters: [
      `coverage`,
      `mocha`,
    ],

    coverageReporter: {
      type: 'lcov',
      dir: 'coverage/',
    },
  }

  if (process.env.CIRCLECI) {
    options.singleRun = true
  }

  config.set(options)
}
