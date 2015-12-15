"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isString;
function isString(str) {
  return typeof str === "string" || str instanceof String;
}