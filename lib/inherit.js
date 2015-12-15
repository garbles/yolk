"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = inherit;
function inherit(child, parent) {
  function __() {
    this.constructor = child;
  }
  __.prototype = parent.prototype;
  child.prototype = new __();

  return child;
}