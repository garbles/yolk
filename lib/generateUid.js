"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = generateUid;
function generateUid() {
  return (Math.random() * 0x100000000000000).toString(36);
}