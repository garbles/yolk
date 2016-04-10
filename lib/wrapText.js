'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wrapText = wrapText;

var _h = require('./h');

var _VirtualNode = require('./VirtualNode');

var _is = require('./is');

function wrap(obj /*: any*/) /*: VirtualNode*/ {
  if ((0, _is.isVirtual)(obj)) {
    return obj;
  }

  return (0, _h.h)('span', { textContent: obj.toString() });
} /* @flow */

function wrapText(arr /*: Array<any>*/) /*: Array<VirtualNode>*/ {
  return arr.map(wrap);
}