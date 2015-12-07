"use strict";

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

var Rx = require("rx");
var isPlainObject = require("lodash.isplainobject");
var isObservable = require("./isObservable");
var isEmpty = require("./isEmpty");
var hasToJS = require("./hasToJS");

module.exports = function wrapObject(obj) {
  var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  if (isObservable(obj)) {
    return obj.flatMapLatest(function (o) {
      return wrapObject(o, opts);
    });
  } else if (hasToJS(obj)) {
    if (opts.wrapToJS) {
      // only call toJS if option is set
      return wrapObject(obj.toJS(), opts);
    }
  } else if (isPlainObject(obj) && !isEmpty(obj)) {
    var _ret = (function () {
      var keys = Object.keys(obj);
      var length = keys.length;
      var values = Array(length);
      var index = -1;

      while (++index < length) {
        var key = keys[index];
        values[index] = wrapObject(obj[key], opts);
      }

      return {
        v: Rx.Observable.combineLatest(values, function combineLatest() {
          var newObj = {};
          index = -1;

          while (++index < length) {
            var key = keys[index];
            newObj[key] = arguments[index];
          }

          return newObj;
        })
      };
    })();

    if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
  } else if (Array.isArray(obj) && obj.length) {
    var _obj = obj.map(function (i) {
      return wrapObject(i, opts);
    });
    return Rx.Observable.combineLatest(_obj);
  }

  return Rx.Observable.just(obj);
};