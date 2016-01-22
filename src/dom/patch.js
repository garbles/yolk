/* @flow */

import dift, {CREATE, UPDATE, MOVE, REMOVE} from 'dift'
import {create, update, move, remove} from './actions'
import {keyIndex} from './keyIndex'
import {VirtualElement} from './VirtualElement'

const keyFn: Function = a => a.key

export function patch (node: HTMLElement, _previous: Array<VirtualElement>, _next: Array<VirtualElement>): void {
  const previousIndex: Array<Object> = keyIndex(_previous)
  const nextIndex: Array<Object> = keyIndex(_next)

  const patches: Array<Function> = []

  function apply (type: number, previous: Object, next: Object, index: number): void {
    switch (type) {
      case CREATE:
        create(node, next.vnode, index)
        break
      case UPDATE:
        update(previous.vnode, next.vnode)
        break
      case MOVE:
        move(node, previous.vnode, next.vnode, index)
        break
      case REMOVE:
        remove(node, previous.vnode)
        break
      default:
        return
    }
  }

  dift(previousIndex, nextIndex, apply, keyFn)
}
