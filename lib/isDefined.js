"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isDefined;
function isDefined(obj) {
  return typeof obj !== "undefined" && obj !== null;
}