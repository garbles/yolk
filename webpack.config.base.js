const path = require(`path`)
const webpack = require(`webpack`)

module.exports = function createWebpackConfig (opts) {
  const devtool = opts.devtool
  const plugins = opts.plugins || []
  const filename = opts.filename

  return {
    devtool,
    plugins,
    entry: path.resolve(__dirname, `./src/index.js`),
    output: {
      path: path.resolve(__dirname, `./dist`),
      filename,
      libraryTarget: `umd`,
      library: `Yolk`
    },
    externals: {
      'rxjs/BehaviorSubject': `Rx`,
      'rxjs/Observable': `Rx`,
      'rxjs/Observer':`Rx`,
      'rxjs/Subject':`Rx`,
      'rxjs/Subscription':`Rx`
    },
    module: {
      loaders: [{
        test: /\.js?$/,
        loader: `babel-loader`,
        exclude: /(node_modules)/
      }]
    }
  }
}
