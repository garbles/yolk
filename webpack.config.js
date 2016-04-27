var path = require("path");
var webpack = require("webpack");

module.exports = {
  entry: path.resolve(__dirname, "./src/index.js"),
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "yolk-dist.js",
    library: "yolk",
    libraryTarget: 'umd',
    umdNamedDefine: true
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
  ],
  externals: {
    "cuid": "cuid",
    "dift": "dift",
    "dom-delegator": "dom-delegator",
    "ev-store": "ev-store",
    "global": "global",
    "individual": "individual",
    "parse-tag": "parse-tag",
    "rxjs": "rxjs",
    "rxjs/add/observable/combineLatest":"rxjs/add/observable/combineLatest",
    "rxjs/add/observable/of": "rxjs/add/observable/of",
    "rxjs/add/operator/map": "rxjs/add/operator/map",
    "rxjs/add/operator/mapTo": "rxjs/add/operator/mapTo",
    "rxjs/add/operator/share":"rxjs/add/operator/share",
    "rxjs/add/operator/switchMap":"rxjs/add/operator/switchMap",
    "rxjs/BehaviorSubject": "rxjs/BehaviorSubject",
    "rxjs/Observable": "rxjs/Observable",
    "rxjs/Observer":"rxjs/Observer",
    "rxjs/Subject":"rxjs/Subject",
    "rxjs/Subscription":"rxjs/Subscription"
  }
};
