/* @flow */

import dift, {CREATE, UPDATE, MOVE, REMOVE} from 'dift'
import {create, update, move, remove} from './actions'
import {batchInsertMessages} from './batchInsertMessages'
import {keyIndex} from './keyIndex'

const keyFn: Function = a => a.key

export function patchChildren (node: HTMLElement, _next: Array<VirtualNode>, _previous?: Array<VirtualNode> = []): Array<VirtualNode> {
  const previousIndex: Array<Object> = keyIndex(_previous)
  const nextIndex: Array<Object> = keyIndex(_next)
  const actions: Array<Function> = []

  function apply (type: number, previous: Object, next: Object, index: number): void {
    switch (type) {
    case CREATE:
      actions.push(create(next.vnode, index))
      break
    case UPDATE:
      actions.push(update(previous.vnode, next.vnode, index))
      break
    case MOVE:
      actions.push(move(previous.vnode, next.vnode, previous.index, index))
      break
    case REMOVE:
      actions.push(remove(previous.vnode, previous.index))
      break
    default:
      return
    }
  }

  const children: Array<VirtualNode> = []
  dift(previousIndex, nextIndex, apply, keyFn)

  return batchInsertMessages(() => {
    return actions.map(fn => fn(node)).reduce((acc,fn) => fn(acc), [])
  })
}
