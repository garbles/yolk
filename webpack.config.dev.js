const _package = require(`./package.json`)
const webpack = require(`webpack`)
const webpackConfig = require(`./webpack.config.base`)

module.exports = Object.assign({}, webpackConfig, {
  plugins: [
    new webpack.DefinePlugin({__DEV__: true})
  ],
})
