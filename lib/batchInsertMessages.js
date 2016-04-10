'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.batchInsertMessages = batchInsertMessages;
/* @flow */

/*:: import type {VirtualNode} from './VirtualNode'*/
/*:: type Scope = {
  batchInProgress: boolean;
  queue: Array<VirtualNode>;
}*/


var scope /*: Scope*/ = {
  batchInProgress: false,
  queue: []
};

function flushQueue(queue /*: Array<VirtualNode>*/) /*: void*/ {
  while (queue.length > 0) {
    var vnode = scope.queue.pop();
    vnode.afterInsert();
  }
}

function batchInsertMessages(callback /*: Function*/, a /*: any*/, b /*: any*/, c /*: any*/) /*: any*/ {
  if (scope.batchInProgress) {
    return callback(scope.queue, a, b, c);
  }

  scope.batchInProgress = true;

  var result = callback(scope.queue, a, b, c);
  flushQueue(scope.queue);

  scope.batchInProgress = false;

  return result;
}