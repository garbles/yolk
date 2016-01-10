const webpackConfig = require(`./webpack.config.test`)

module.exports = config => {
  config.set({
    basePath: ``,

    frameworks: [`mocha`, `chai`],

    browsers: [`Chrome`],

    files: [`src/**/*.test.js`],

    preprocessors: {
      'src/**/*.test.js': [`webpack`]
    },

    colors: true,

    webpack: webpackConfig,

    webpackMiddleware: {
      noInfo: true
    },

    eslint: {
      stopOnError: true,
      stopOnWarning: true
    },

    reporters: [
      `mocha`,
      // `coverage`,
      `growl`,
    ],

    // coverageReporter: {
    //   type: 'text',
    //   dir: 'coverage/'
    // }
  })
}
