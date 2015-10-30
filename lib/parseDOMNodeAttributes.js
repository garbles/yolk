"use strict";

var camelCase = require("lodash.camelcase");

var ALL_CHARS_ARE_DIGITS_REGEX = /^\d*$/;
var DOES_NOT_LEAD_WITH_ENCLOSING_CHAR_REGEX = /^[^\{\[\"\']/;

function isSingleton(value) {
  return value === "true" || value === "false" || value === "null";
}

module.exports = function parseDOMNodeAttributes(attributes) {
  var attrs = {};
  var length = attributes.length;
  var i = -1;

  while (++i < length) {
    var attr = attributes[i];
    var _name = camelCase(attr.name);
    var value = attr.value;

    if (!ALL_CHARS_ARE_DIGITS_REGEX.test(value) && !isSingleton(value) && DOES_NOT_LEAD_WITH_ENCLOSING_CHAR_REGEX.test(value)) {
      value = "\"" + value + "\"";
    }

    attrs[_name] = JSON.parse(value);
  }

  return attrs;
};