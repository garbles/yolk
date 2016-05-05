const path = require(`path`)

const webpackConfig = {
  devtool: `inline-source-map`,

  node: {
    fs: `empty`
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: `babel`
      },
    ],

    postLoaders: [{
      test: /\.js$/,
      exclude: /(__test__|node_modules)/,
      loader: `istanbul-instrumenter`,
    }],
  },

  resolve: {
    modulesDirectories: [
      path.join(__dirname, `node_modules`),
      path.join(__dirname, `src`)
    ],
    extensions: [``, `.js`]
  },
}

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

  if (process.env.GROWL) {
    options.reporters.push(`growl`)
  }

  config.set(options)
}
