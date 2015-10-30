"use strict";

var Rx = require("rx");
var isPlainObject = require("lodash.isplainobject");
var isObservable = require("./isObservable");
var isEmpty = require("./isEmpty");
var hasToJS = require("./hasToJS");

module.exports = function wrapObject(_x2) {
  var _arguments = arguments;
  var _again = true;

  _function: while (_again) {
    var obj = _x2;
    _again = false;
    var opts = _arguments.length <= 1 || _arguments[1] === undefined ? {} : _arguments[1];

    if (isObservable(obj)) {
      return obj.flatMapLatest(function (o) {
        return wrapObject(o, opts);
      });
    } else if (hasToJS(obj)) {
      if (opts.wrapToJS) {
        // only call toJS if option is set
        _arguments = [_x2 = obj.toJS(), opts];
        _again = true;
        opts = undefined;
        continue _function;
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

      if (typeof _ret === "object") return _ret.v;
    } else if (Array.isArray(obj) && obj.length) {
      var _obj = obj.map(function (i) {
        return wrapObject(i, opts);
      });
      return Rx.Observable.combineLatest(_obj);
    }

    return Rx.Observable.just(obj);
  }
};