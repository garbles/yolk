/* @flow */

import dift, {CREATE, UPDATE, MOVE, REMOVE} from 'dift'
import {keyIndex} from './keyIndex'
import {VirtualNode} from './VirtualNode'

const keyFn: Function = a => a.key

export function patch (parent: VirtualNode, _previous: Array<VirtualNode>, _next: Array<VirtualNode>): void {
  const previousIndex: Array<Object> = keyIndex(_previous)
  const nextIndex: Array<Object> = keyIndex(_next)
  const children = ([]).concat(_previous)

  function apply (type: number, previous: Object, next: Object, index: number): void {
    switch (type) {
      case CREATE:
        parent.insertChild(next.vnode, index)
        children.splice(index, 0, next.vnode)
        break
      case UPDATE:
        previous.vnode.patch(next.vnode)
        break
      case MOVE:
        parent.moveChild(previous.vnode, index)
        previous.vnode.patch(next.vnode)
        children.splice(previous.index, 1)
        children.splice(index, 0, previous.vnode)
        break
      case REMOVE:
        parent.removeChild(previous.vnode)
        chilren.splice(index, 1)
        break
      default:
        return
    }
  }

  dift(previousIndex, nextIndex, apply, keyFn)

  return children
}

export function createPatchChildren (vnode: VirtualNode): Function {
  let previous: Array<VirtualNode> = []

  return (next: Array<VirtualNode>): Array<VirtualNode> => {
    previous = patch(vnode, previous, next)
    return previous
  }
}
