"use strict";

var Rx = require("rx");
var isPlainObject = require("lodash.isplainobject");
var isObservable = require("./isObservable");
var isEmpty = require("./isEmpty");

module.exports = function wrapObject(obj) {
  if (isObservable(obj)) {
    return obj.flatMapLatest(wrapObject);
  } else if (isPlainObject(obj) && !isEmpty(obj)) {
    var _ret = (function () {
      var keys = Object.keys(obj);
      var length = keys.length;
      var values = Array(length);
      var index = -1;

      while (++index < length) {
        var key = keys[index];
        values[index] = wrapObject(obj[key]);
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

    if (typeof _ret === "object") return _ret.v;
  } else if (Array.isArray(obj) && obj.length) {
    var _obj = obj.map(wrapObject);
    return Rx.Observable.combineLatest(_obj);
  }

  return Rx.Observable.just(obj);
};