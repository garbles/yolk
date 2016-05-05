const createWebpackConfig = require('./webpack.config.base')
const webpack = require(`webpack`)

module.exports = createWebpackConfig({
  devtool: `source-map`,
  filename: `yolk.min.js`,
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
})
