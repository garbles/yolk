/* @flow */

import dift, {CREATE, UPDATE, MOVE, REMOVE} from 'dift'
import {VirtualNode} from 'yolk/VirtualNode'
import {keyIndex} from 'yolk/keyIndex'

const keyFn: Function = a => a.key

const patch = (patchOps: Object, previousChildren: Array<VirtualNode>, nextChildren: Array<VirtualNode>): void => {
  const previousIndex = keyIndex(previousChildren)
  const nextIndex = keyIndex(nextChildren)

  function apply (type: number, previous: Object, next: Object, index: number): void {
    switch (type) {
      case CREATE:
        patchOps.insertChild(next.vnode, index)
        break
      case UPDATE:
        patchOps.updateChild(previous.vnode, next.vnode, index)
        break
      case MOVE:
        patchOps.moveChild(previous.vnode, next.vnode, index)
        break
      case REMOVE:
        patchOps.removeChild(previous.vnode)
        break
      default:
        return
    }
  }

  dift(previousIndex, nextIndex, apply, keyFn)
}

export const createPatchChildren = (patchOps: Object): Function => {
  let previous: Array<VirtualNode> = []

  return (next: Array<VirtualNode>): Array<VirtualNode> => {
    if (previous.length !== 0 || next.length !== 0) {
      patch(patchOps, previous, next)
    }

    previous = next
    return next
  }
}
