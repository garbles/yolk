"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isFunction;
function isFunction(obj) {
  return Object.prototype.toString.call(obj) === "[object Function]";
}