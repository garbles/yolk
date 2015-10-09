"use strict";

var DOMProperties = require("./DOMProperties");
var transformStyle = require("./transformStyle");
var transformProperty = require("./transformProperty");
var hasToJS = require("./hasToJS");

module.exports = function transformProperties(props) {
  var keys = Object.keys(props);
  var length = keys.length;
  var newProps = { attributes: {} };
  var i = -1;

  while (++i < length) {
    var key = keys[i];
    var value = props[key];
    value = hasToJS(value) ? value.toJS() : value;

    if (key === "style") {
      transformStyle(newProps, value);
    } else {
      transformProperty(newProps, key, value, DOMProperties[key]);
    }
  }

  return newProps;
};