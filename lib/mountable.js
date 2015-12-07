"use strict";

var isFunction = require("./isFunction");
var CustomEvent = require("./CustomEvent");

function emitMount(node, fn) {
  if (isFunction(fn) && node.parentNode) {
    var event = new CustomEvent("mount");
    node.dispatchEvent(event);
  }
}

function emitUnmount(node, fn) {
  if (isFunction(fn)) {
    var event = new CustomEvent("unmount");
    node.dispatchEvent(event);
  }
}

module.exports = { emitMount: emitMount, emitUnmount: emitUnmount };