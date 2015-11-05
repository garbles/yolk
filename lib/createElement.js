"use strict";

var YolkCompositeComponent = require("./YolkCompositeComponent");
var YolkBaseComponent = require("./YolkBaseComponent");
var isString = require("./isString");

module.exports = function createElement(tag, props) {
  var _props = props || {};

  for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  if (isString(tag)) {
    return new YolkBaseComponent(tag, _props, children);
  }

  if (tag._isCustomComponent) {
    return tag.create(_props, children);
  }

  return new YolkCompositeComponent(tag, _props, children);
};