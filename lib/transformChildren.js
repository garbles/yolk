"use strict";

var flatten = require("./flatten");
var wrapObject = require("./wrapObject");
var hasToJS = require("./hasToJS");

function toJSify(children) {
  var _children = flatten([children]);
  var length = _children.length;
  var mustFlatten = false;
  var i = -1;
  var arr = Array(length);

  while (++i < length) {
    var child = _children[i];
    var newChild = hasToJS(child) ? child.toJS() : child;
    arr[i] = newChild;
    mustFlatten = mustFlatten || child !== newChild;
  }

  if (mustFlatten) {
    arr = flatten(arr);
  }

  return arr;
}

module.exports = function transformChildren(children) {
  var _children = toJSify(children);
  return wrapObject(_children);
};