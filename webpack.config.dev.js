const createWebpackConfig = require('./webpack.config.base')

module.exports = createWebpackConfig({
  devtool: `cheap-source-map`,
  filename: `yolk.js`,
  plugins: []
})
