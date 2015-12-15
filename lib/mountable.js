'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.emitMount = emitMount;
exports.emitUnmount = emitUnmount;

var _isFunction = require('./isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

var _CustomEvent = require('./CustomEvent');

var _CustomEvent2 = _interopRequireDefault(_CustomEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function emitMount(node, fn) {
  if ((0, _isFunction2.default)(fn) && node.parentNode) {
    var event = new _CustomEvent2.default('mount');
    node.dispatchEvent(event);
  }
}

function emitUnmount(node, fn) {
  if ((0, _isFunction2.default)(fn)) {
    var event = new _CustomEvent2.default('unmount');
    node.dispatchEvent(event);
  }
}