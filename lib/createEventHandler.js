'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createEventHandler;

var _yolk = require('./yolk');

var _isDefined = require('./isDefined');

var _isDefined2 = _interopRequireDefault(_isDefined);

var _isFunction = require('./isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

var _addProperties = require('./addProperties');

var _addProperties2 = _interopRequireDefault(_addProperties);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createEventHandler(mapFn, init) {
  var initIsDefined = (0, _isDefined2.default)(init);
  var mapFnIsDefined = (0, _isDefined2.default)(mapFn);
  var mapFnIsFunction = (0, _isFunction2.default)(mapFn);
  var handler = undefined;

  if (mapFnIsDefined && mapFnIsFunction) {
    handler = function handlerWithFunctionMap(value) {
      handler.onNext(mapFn(value));
    };
  } else if (mapFnIsDefined) {
    handler = function handlerWithValueMap() {
      handler.onNext(mapFn);
    };
  } else {
    handler = function handlerWithoutMap(value) {
      handler.onNext(value);
    };
  }

  (0, _addProperties2.default)(handler, _yolk.Rx.ReplaySubject.prototype);
  _yolk.Rx.ReplaySubject.call(handler, 1);

  if (initIsDefined) {
    handler.onNext(init);
  }

  return handler;
}