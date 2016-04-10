"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.flatten = flatten;
/* @flow */

function flatten(arr /*: Array<any>*/) /*: Array<any>*/ {
  var len /*: number*/ = arr.length;
  var i /*: number*/ = -1;
  var result /*: Array<any>*/ = [];

  while (++i < len) {
    var member /*: any*/ = arr[i];

    if (Array.isArray(member)) {
      result = result.concat(flatten(member));
    } else {
      result.push(member);
    }
  }

  return result;
}