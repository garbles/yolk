var path = require("path");
var webpack = require("webpack");

module.exports = {
  entry: path.resolve(__dirname, "./src/index.js"),
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "yolk.min.js",
    libraryTarget: 'var',
    library: "Yolk"
  },
  externals: {
    "rxjs/BehaviorSubject": "Rx",
    "rxjs/Observable": "Rx",
    "rxjs/Observer":"Rx",
    "rxjs/Subject":"Rx",
    "rxjs/Subscription":"Rx"
  },
  module: {
    loaders: [{
      test: /\.js?$/,
      loader: "babel-loader",
      exclude: /(node_modules)/
    }]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
};
