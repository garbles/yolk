'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseTag = parseTag;

var _parseTag = require('parse-tag');

var _parseTag2 = _interopRequireDefault(_parseTag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TAG_IS_ONLY_LETTERS = /^[a-zA-Z]*$/;

function parseTag(_tagName, props) {
  var tagName = _tagName;

  if (!TAG_IS_ONLY_LETTERS.test(tagName)) {
    tagName = (0, _parseTag2.default)(_tagName, props).toLowerCase();
  }

  return tagName;
}