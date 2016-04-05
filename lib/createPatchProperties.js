'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPatchProperties = createPatchProperties;
/* @flow */

/*:: import type {NodeProxy} from './NodeProxy'*/


function patchProperties(nodeProxy /*: NodeProxy*/, props /*: Object*/, oldProps /*: Object*/) /*: Object*/ {
  for (var key in props) {
    if (props[key] !== oldProps[key]) {
      nodeProxy.setAttribute(key, props[key]);
    }
  }

  for (var _key in oldProps) {
    if (!(_key in props)) {
      nodeProxy.removeAttribute(_key);
    }
  }

  return props;
}

function createPatchProperties(nodeProxy /*: NodeProxy*/) /*: Function*/ {
  var previous /*: Object*/ = {};

  return function (next /*: Object*/) /*: void*/ {
    previous = patchProperties(nodeProxy, next, previous);
  };
}