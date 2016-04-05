'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.keyIndex = keyIndex;
/* @flow */

/*:: import type {VirtualNode} from './VirtualNode'*/
function keyIndex(children /*: Array<VirtualNode>*/) /*: Array<Object>*/ {
  var len /*: number*/ = children.length;
  var arr /*: Array<Object>*/ = [];
  var i /*: number*/ = -1;

  while (++i < len) {
    var child /*: VirtualNode*/ = children[i];

    if (!child) {
      continue;
    }

    arr.push({
      key: child.key ? child.tagName + '-' + child.key : child.tagName,
      vnode: child
    });
  }

  return arr;
}