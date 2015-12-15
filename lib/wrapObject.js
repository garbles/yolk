'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = wrapObject;

var _lodash = require('lodash.isplainobject');

var _lodash2 = _interopRequireDefault(_lodash);

var _isObservable = require('./isObservable');

var _isObservable2 = _interopRequireDefault(_isObservable);

var _isEmpty = require('./isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _hasToJS = require('./hasToJS');

var _hasToJS2 = _interopRequireDefault(_hasToJS);

var _yolk = require('./yolk');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

function wrapObject(obj) {
  var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  if ((0, _isObservable2.default)(obj)) {
    return obj.flatMapLatest(function (o) {
      return wrapObject(o, opts);
    });
  } else if ((0, _hasToJS2.default)(obj)) {
    if (opts.base) {
      // only call toJS about to render base component
      return wrapObject(obj.toJS(), opts);
    }
  } else if ((0, _lodash2.default)(obj) && !(0, _isEmpty2.default)(obj)) {
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
        v: _yolk.Rx.Observable.combineLatest(values, function combineLatest() {
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

    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
  } else if (Array.isArray(obj) && obj.length) {
    var _obj = obj.map(function (i) {
      return wrapObject(i, opts);
    });
    return _yolk.Rx.Observable.combineLatest(_obj);
  }

  return _yolk.Rx.Observable.just(obj);
}