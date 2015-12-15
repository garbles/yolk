'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createElement;

var _YolkCompositeComponent = require('./YolkCompositeComponent');

var _YolkBaseComponent = require('./YolkBaseComponent');

var _YolkCustomComponent = require('./YolkCustomComponent');

var _isString = require('./isString');

var _isString2 = _interopRequireDefault(_isString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createElement(tag, _props) {
  var props = _extends({}, _props);

  for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  if ((0, _isString2.default)(tag)) {
    return (0, _YolkBaseComponent.create)(tag, props, children);
  }

  if (tag._isCustomComponent) {
    return (0, _YolkCustomComponent.create)(tag, props, children);
  }

  return (0, _YolkCompositeComponent.create)(tag, props, children);
}