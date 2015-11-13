"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var parseTag = require("parse-tag");
var createElement = require("./createElement");
var isString = require("./isString");
var flatten = require("./flatten");

module.exports = function h(_tag, _props) {
  var tag = undefined;
  var props = _extends({}, _props);

  for (var _len = arguments.length, _children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    _children[_key - 2] = arguments[_key];
  }

  var children = flatten(_children);

  if (isString(_tag)) {
    tag = parseTag(_tag, props).toLowerCase();
  } else {
    tag = _tag;
  }

  return createElement.apply(undefined, [tag, props].concat(_toConsumableArray(children)));
};