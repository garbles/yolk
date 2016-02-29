/* @flow */

import dift, {CREATE, UPDATE, MOVE, REMOVE} from 'dift'
import {keyIndex} from './keyIndex'
import {VirtualElement} from './VirtualElement'

const keyFn: Function = a => a.key

export function patch (parent: VirtualElement, _previous: Array<VirtualElement>, _next: Array<VirtualElement>): void {
  const previousIndex: Array<Object> = keyIndex(_previous)
  const nextIndex: Array<Object> = keyIndex(_next)

  function apply (type: number, previous: Object, next: Object, index: number): void {
    switch (type) {
      case CREATE:
        parent.insertChild(next.vnode, index)
        break
      case UPDATE:
        next.vnode.patch(previous.vnode)
        break
      case MOVE:
        parent.moveChild(previous.vnode, next.vnode, index)
        break
      case REMOVE:
        parent.removeChild(previous.vnode)
        break
      default:
        return
    }
  }

  dift(previousIndex, nextIndex, apply, keyFn)
}

export function createPatchChildren (vnode: VirtualElement): Function {
  let previous: Array<VirtualElement> = []

  return (next: Array<VirtualElement>): Array<VirtualElement> => {
    patch(vnode, previous, next)
    previous = next

    return next
  }
}
