'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseTag;

var _parseTag = require('parse-tag');

var _parseTag2 = _interopRequireDefault(_parseTag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parseTag(_tag) {
  var classIds = {};
  var tag = (0, _parseTag2.default)(_tag, classIds).toLowerCase();
  return { tag: tag, classIds: classIds };
}