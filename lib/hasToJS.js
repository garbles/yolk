'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = hasToJS;

var _isFunction = require('./isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function hasToJS(obj) {
  return !!obj && (0, _isFunction2.default)(obj.toJS);
}