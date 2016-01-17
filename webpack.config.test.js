const path = require(`path`)

module.exports = {
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
