'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isComponent;

var _isWidget = require('yolk-virtual-dom/vnode/is-widget');

var _isWidget2 = _interopRequireDefault(_isWidget);

var _isVnode = require('yolk-virtual-dom/vnode/is-vnode');

var _isVnode2 = _interopRequireDefault(_isVnode);

var _isVtext = require('yolk-virtual-dom/vnode/is-vtext');

var _isVtext2 = _interopRequireDefault(_isVtext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isComponent(obj) {
  return !!obj && ((0, _isWidget2.default)(obj) || (0, _isVnode2.default)(obj) || (0, _isVtext2.default)(obj));
}