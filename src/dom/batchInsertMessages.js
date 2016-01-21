/* @flow */

import {VirtualElement} from './VirtualElement'

type Scope = {
  batchInProgress: boolean;
  queue: Array<VirtualElement>;
}

const scope: Scope = {
  batchInProgress: false,
  queue: [],
}

function flushQueue (queue: Array<VirtualElement>): void {
  while (queue.length > 0) {
    const vnode = scope.queue.pop()
    vnode.insert()
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
