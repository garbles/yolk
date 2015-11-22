"use strict";

var isFunction = require("./isFunction");
var CustomEvent = require("./CustomEvent");

function emitMount(node, fn) {
  if (isFunction(fn) && node.parentNode) {
    var _event = new CustomEvent("mount");
    node.dispatchEvent(_event);
  }
}

function emitUnmount(node, fn) {
  if (isFunction(fn)) {
    var _event2 = new CustomEvent("unmount");
    node.dispatchEvent(_event2);
  }
}

module.exports = { emitMount: emitMount, emitUnmount: emitUnmount };