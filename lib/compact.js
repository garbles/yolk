"use strict";

var isDefined = require("./isDefined");

module.exports = function compact(arr) {
  var length = arr.length;
  var newArr = [];
  var i = -1;

  while (++i < length) {
    var value = arr[i];
    if (isDefined(value) && value !== false) {
      newArr.push(value);
    }
  }

  return newArr;
};