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
      actions.push(create(node, next.vnode, index))
      break
    case UPDATE:
      actions.push(update(node, previous.vnode, next.vnode, index))
      break
    case MOVE:
      actions.push(move(node, previous.vnode, next.vnode, previous.index, index))
      break
    case REMOVE:
      actions.push(remove(node, previous.vnode, previous.index))
      break
    default:
      return
    }
  }

  const children: Array<VirtualNode> = []

  batchInsertMessages(() => {
    dift(previousIndex, nextIndex, apply, keyFn)
    actions.forEach(fn => fn(children))
  })

  return children
}
