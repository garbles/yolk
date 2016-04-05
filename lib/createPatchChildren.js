'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPatchChildren = undefined;

var _dift = require('dift');

var _dift2 = _interopRequireDefault(_dift);

var _keyIndex = require('./keyIndex');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* @flow */

/*:: import type {VirtualElement, NodeProxyDecorator} from './types'*/


var keyFn /*: Function*/ = function keyFn(a) {
  return a.key;
};

var patch = function patch(decorator /*: NodeProxyDecorator*/, previousChildren /*: Array<VirtualElement>*/, nextChildren /*: Array<VirtualElement>*/) /*: void*/ {
  var previousIndex = (0, _keyIndex.keyIndex)(previousChildren);
  var nextIndex = (0, _keyIndex.keyIndex)(nextChildren);

  function apply(type /*: number*/, previous /*: Object*/, next /*: Object*/, index /*: number*/) /*: void*/ {
    switch (type) {
      case _dift.CREATE:
        decorator.insertChild(next.vnode, index);
        break;
      case _dift.UPDATE:
        decorator.updateChild(previous.vnode, next.vnode, index);
        break;
      case _dift.MOVE:
        decorator.moveChild(previous.vnode, next.vnode, index);
        break;
      case _dift.REMOVE:
        decorator.removeChild(previous.vnode);
        break;
      default:
        return;
    }
  }

  (0, _dift2.default)(previousIndex, nextIndex, apply, keyFn);
};

var createPatchChildren = exports.createPatchChildren = function createPatchChildren(decorator /*: NodeProxyDecorator*/) /*: Function*/ {
  var previous /*: Array<VirtualElement>*/ = [];

  return function (next /*: Array<VirtualElement>*/) /*: Array<VirtualElement>*/ {
    if (previous.length !== 0 || next.length !== 0) {
      patch(decorator, previous, next);
    }

    previous = next;
    return next;
  };
};