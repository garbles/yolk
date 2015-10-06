"use strict";

module.exports = function inherit(child, parent) {
  function __() {
    this.constructor = child;
  }
  __.prototype = parent.prototype;
  child.prototype = new __();

  return child;
};