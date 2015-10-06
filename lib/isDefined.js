"use strict";

module.exports = function isDefined(obj) {
  return typeof obj !== "undefined" && obj !== null;
};