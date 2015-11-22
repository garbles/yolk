"use strict";

var _parseTag = require("parse-tag");

module.exports = function parseTag(_tag) {
  var classIds = {};
  var tag = _parseTag(_tag, classIds).toLowerCase();
  return { tag: tag, classIds: classIds };
};