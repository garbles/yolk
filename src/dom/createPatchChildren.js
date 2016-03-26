/* @flow */

import dift, {CREATE, UPDATE, MOVE, REMOVE} from 'dift'
import {VirtualNode} from './VirtualNode'

const keyFn: Function = a => (a.key || a.tagName)

export function patch (parent: VirtualNode, previousChildren: Array<VirtualNode>, nextChildren: Array<VirtualNode>): void {
  function apply (type: number, previous: Object, next: Object, index: number): void {
    switch (type) {
      case CREATE:
        parent.insertChild(next, index)
        break
      case UPDATE:
        previous.patch(next)
        break
      case MOVE:
        parent.moveChild(previous, index)
        previous.patch(next)
        break
      case REMOVE:
        previous.beforeDestroy()
        parent.removeChild(previous)
        previous.destroy()
        break
      default:
        return
    }
  }

  dift(previousChildren, nextChildren, apply, keyFn)
}

export function createPatchChildren (vnode: VirtualNode): Function {
  let previous: Array<VirtualNode> = []

  return (next: Array<VirtualNode>): Array<VirtualNode> => {
    if (previous.length === 0 && next.length === 0) {
      return next;
    }

    patch(vnode, previous, next)
    previous = next
    return next
  }
}
