"use strict";

var DOMAttributeDescriptors = require("./DOMAttributeDescriptors");
var transformStyle = require("./transformStyle");
var transformProperty = require("./transformProperty");

module.exports = function transformProperties(props) {
  var keys = Object.keys(props);
  var length = keys.length;
  var newProps = { attributes: {} };
  var i = -1;

  while (++i < length) {
    var key = keys[i];
    var value = props[key];

    if (key === "style") {
      transformStyle(newProps, value);
    } else {
      transformProperty(newProps, key, value, DOMAttributeDescriptors[key]);
    }
  }

  return newProps;
};