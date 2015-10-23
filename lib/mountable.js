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
  if (!isFunction(fn)) {
    return;
  }

  var event = new CustomEvent("unmount");

  // node has already been removed from the DOM, so we can`t use delegation
  node.addEventListener("unmount", fn, true);
  node.dispatchEvent(event);
  node.removeEventListener("unmount", fn, true);
}

module.exports = { emitMount: emitMount, emitUnmount: emitUnmount };