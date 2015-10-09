"use strict";

module.exports = function flatten(arr) {
  var length = arr.length;
  var result = [];
  var index = -1;

  while (++index < length) {
    var member = arr[index];

    if (Array.isArray(member)) {
      result = result.concat(flatten(member));
    } else {
      result.push(member);
    }
  }

  return result;
};