const _package = require(`./package.json`)

module.exports = {
  module: {
    loaders: [
      {
        test: /\.js/,
        exclude: [/node_modules/],
        loader: `babel`,
      },
    ],
  },
  externals: {
    rx: `Rx`,
  },
  output: { library: _package.name, libraryTarget: `umd` },
  resolve: {
    alias: {
      Rx: `rx`,
    },
    extensions: [``, `.js`],
    modulesDirectories: [`node_modules`, `lib`],
  },
}
