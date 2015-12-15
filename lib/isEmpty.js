"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isEmpty;
function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}