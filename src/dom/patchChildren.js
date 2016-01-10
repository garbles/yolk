/* @flow */

import dift, {CREATE, UPDATE, MOVE, REMOVE} from 'dift'
import {VirtualNode} from './VirtualNode'
import {VirtualText} from './VirtualText'
import {create, update, move, remove} from './actions'
import {keyIndex} from './keyIndex'
import {isNumber} from '../util/isNumber'

export function patchChildren (node: Object, _next: Array<VirtualNode | VirtualText>, _previous?: Array<VirtualNode | VirtualText> = []): Array<VirtualNode | VirtualText> {
  const previousIndex: Array<Object> = keyIndex(_previous)
  const nextIndex: Array<Object> = keyIndex(_next)
  const keyFn: Function = a => a.key
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

  dift(previousIndex, nextIndex, apply, keyFn)

  const children: Array<VirtualNode | VirtualText> = []
  actions.forEach(fn => fn(children))

  return children
}
