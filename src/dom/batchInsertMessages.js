/* @flow */

const scope = {
  batchInProgress: false,
  queue: [],
}

function flushQueue (): void {
  while (scope.queue.length > 0) {
    const {vnode, node} = scope.queue.pop()
    vnode.insert(node)
  }
}

export function batchInsertMessages (callback: Function, a: any, b: any, c: any): any {
  if (scope.batchInProgress) {
    return callback(scope.queue, a, b, c)
  }

  scope.batchInProgress = true

  const result = callback(scope.queue, a, b, c)
  flushQueue()

  scope.batchInProgress = false

  return result
}
