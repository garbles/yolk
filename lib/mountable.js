"use strict";

var isFunction = require("./isFunction");
var CustomEvent = require("./CustomEvent");

function emitMount(node, fn) {
  if (!isFunction(fn)) {
    return;
  }

  if (node.parentNode) {
    var _event = new CustomEvent("mount");
    node.dispatchEvent(_event);
  } else {
    setTimeout(function () {
      return emitMount(node, fn);
    }, 0);
  }
}

function emitUnmount(node, fn) {
  if (isFunction(fn)) {
    var _event2 = new CustomEvent("unmount");
    node.dispatchEvent(_event2);
  }
}

module.exports = { emitMount: emitMount, emitUnmount: emitUnmount };