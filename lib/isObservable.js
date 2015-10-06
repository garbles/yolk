"use strict";

var Rx = require("rx");

module.exports = function isObservable(obj) {
  return obj instanceof Rx.Observable;
};