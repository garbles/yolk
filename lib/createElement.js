"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var parseTag = require("parse-tag");
var YolkCompositeComponent = require("./YolkCompositeComponent");
var YolkBaseComponent = require("./YolkBaseComponent");
var isString = require("./isString");
var flatten = require("./flatten");

var TAG_IS_ONLY_LETTERS = /^[a-zA-Z]*$/;

module.exports = function createElement(_tag, _props) {
  var tag = _tag;
  var props = _extends({}, _props);

  for (var _len = arguments.length, _children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    _children[_key - 2] = arguments[_key];
  }

  var children = flatten(_children);

  if (isString(tag)) {
    if (!TAG_IS_ONLY_LETTERS.test(tag)) {
      tag = parseTag(tag, props).toLowerCase();
    }

    return new YolkBaseComponent(tag, props, children);
  }

  if (tag._isCustomComponent) {
    return tag.create(props, children);
  }

  return new YolkCompositeComponent(tag, props, children);
};