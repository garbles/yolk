"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var YolkCompositeComponent = require("./YolkCompositeComponent");
var YolkBaseComponent = require("./YolkBaseComponent");
var isString = require("./isString");

module.exports = function createElement(tag, _props) {
  var props = _extends({}, _props);

  for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  if (isString(tag)) {
    return YolkBaseComponent.create(tag, props, children);
  }

  if (tag._isCustomComponent) {
    return tag.create(props, children);
  }

  return YolkCompositeComponent.create(tag, props, children);
};