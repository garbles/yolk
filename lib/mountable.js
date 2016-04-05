'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.emitMount = emitMount;
exports.emitUnmount = emitUnmount;

var _CustomEvent = require('./CustomEvent');

var _is = require('./is');

/* @flow */

function emitMount(node /*: HTMLElement*/, fn /*: Function | void*/) /*: void*/ {
  if ((0, _is.isFunction)(fn) && node.parentNode) {
    var event /*: CustomEvent*/ = new _CustomEvent.CustomEvent('mount');
    node.dispatchEvent(event);
  }
}

function emitUnmount(node /*: HTMLElement*/, fn /*: Function | void*/) /*: void*/ {
  if ((0, _is.isFunction)(fn) && node.parentNode) {
    var event /*: CustomEvent*/ = new _CustomEvent.CustomEvent('unmount');
    node.dispatchEvent(event);
  }
}