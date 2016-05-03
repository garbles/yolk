/* @flow */

import type {VirtualNode} from './types'

type Scope = {
  batchInProgress: boolean;
  queue: Array<VirtualNode>;
}

const scope: Scope = {
  batchInProgress: false,
  queue: [],
}

function flushQueue (queue: Array<VirtualNode>): void {
  while (queue.length > 0) {
    const vnode = scope.queue.pop()
    vnode.afterInsert()
  }
}

export function batchInsertMessages (callback: Function, a: any, b: any, c: any): any {
  if (scope.batchInProgress) {
    return callback(scope.queue, a, b, c)
  }

  scope.batchInProgress = true

  const result = callback(scope.queue, a, b, c)
  flushQueue(scope.queue)

  scope.batchInProgress = false

  return result
}
