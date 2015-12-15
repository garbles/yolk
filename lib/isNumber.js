"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isNumber;
function isNumber(num) {
  return typeof num === "number" || num instanceof Number;
}