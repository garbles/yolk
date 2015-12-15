'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseDOMNodeAttributes;

var _lodash = require('lodash.camelcase');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ALL_CHARS_ARE_DIGITS_REGEX = /^\d*$/;
var DOES_NOT_LEAD_WITH_ENCLOSING_CHAR_REGEX = /^[^\{\[\"\']/;

function isSingleton(value) {
  return value === 'true' || value === 'false' || value === 'null';
}

function parseDOMNodeAttributes(attributes) {
  var attrs = {};
  var length = attributes.length;
  var i = -1;

  while (++i < length) {
    var attr = attributes[i];
    var name = (0, _lodash2.default)(attr.name);
    var value = attr.value;

    if (!ALL_CHARS_ARE_DIGITS_REGEX.test(value) && !isSingleton(value) && DOES_NOT_LEAD_WITH_ENCLOSING_CHAR_REGEX.test(value)) {
      value = '"' + value + '"';
    }

    attrs[name] = JSON.parse(value);
  }

  return attrs;
}