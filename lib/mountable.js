"use strict";

var isFunction = require("./isFunction");
var CustomEvent = require("./CustomEvent");

function emitMount(node) {
  if (node.parentNode) {
    var _event = new CustomEvent("mount");
    node.dispatchEvent(_event);
  } else {
    setTimeout(function () {
      return emitMount(node);
    }, 0);
  }
}

function emitUnmount(node, _ref) {
  var onMount = _ref.onMount;
  var onUnmount = _ref.onUnmount;

  var event = new CustomEvent("unmount");
  node.dispatchEvent(event);

  if (isFunction(onUnmount)) {
    node.removeEventListener("unmount", onUnmount);
  }

  if (isFunction(onMount)) {
    node.removeEventListener("mount", onMount);
  }
}

module.exports = { emitMount: emitMount, emitUnmount: emitUnmount };