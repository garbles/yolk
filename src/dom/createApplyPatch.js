/* @flow */

import dift, {CREATE, UPDATE, MOVE, REMOVE} from 'dift'
import {create, update, move, remove} from './actions'
import {keyIndex} from './keyIndex'
import {VirtualElement} from './VirtualElement'

const keyFn: Function = a => a.key

export function createApplyPatch (_previous: Array<VirtualElement>, _next: Array<VirtualElement>): Function {
  const previousIndex: Array<Object> = keyIndex(_previous)
  const nextIndex: Array<Object> = keyIndex(_next)

  const patches: Array<Function> = []

  function apply (type: number, previous: Object, next: Object, index: number): void {
    switch (type) {
      case CREATE:
        patches.push(create(next.vnode, index))
        break
      case UPDATE:
        patches.push(update(previous.vnode, next.vnode, index))
        break
      case MOVE:
        patches.push(move(previous.vnode, next.vnode, index))
        break
      case REMOVE:
        patches.push(remove(previous.vnode))
        break
      default:
        return
    }
  }

  dift(previousIndex, nextIndex, apply, keyFn)

  return node => patches.map(fn => fn(node)).reduce((acc, fn) => fn(acc), [])
}
