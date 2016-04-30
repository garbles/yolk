/* @flow */

import dift, {CREATE, UPDATE, MOVE, REMOVE} from 'dift'

import {keyIndex} from './keyIndex'

import type {VirtualNode, ElementProxyDecorator} from './types'

const keyFn: Function = a => a.key

const patch = (decorator: ElementProxyDecorator, previousChildren: Array<VirtualNode>, nextChildren: Array<VirtualNode>): void => {
  const previousIndex = keyIndex(previousChildren)
  const nextIndex = keyIndex(nextChildren)

  function apply (type: number, previous: Object, next: Object, index: number): void {
    switch (type) {
      case CREATE:
        decorator.insertChild(next.vnode, index)
        break
      case UPDATE:
        decorator.updateChild(previous.vnode, next.vnode, index)
        break
      case MOVE:
        decorator.moveChild(previous.vnode, next.vnode, index)
        break
      case REMOVE:
        decorator.removeChild(previous.vnode)
        break
      default:
        return
    }
  }

  dift(previousIndex, nextIndex, apply, keyFn)
}

export const createPatchChildren = (decorator: ElementProxyDecorator): Function => {
  let previous: Array<VirtualNode> = []

  return (next: Array<VirtualNode>): Array<VirtualNode> => {
    if (previous.length !== 0 || next.length !== 0) {
      patch(decorator, previous, next)
    }

    previous = next
    return next
  }
}
