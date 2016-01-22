/* @flow */

import {VirtualElement} from './VirtualElement'
import {batchInsertMessages} from './batchInsertMessages'
import {isDefined} from '../util/isDefined'

function insert (node: HTMLElement, child: Element, index: number): void {
  const before: Node = node.children[index]

  if (isDefined(before)) {
    node.insertBefore(child, before)
  } else {
    node.appendChild(child)
  }
}

export function create (node: HTMLElement, next: VirtualElement, index: number): void {
  return batchInsertMessages(queue => {
    const child: Element = next.create()
    insert(node, child, index)
    queue.push(next)
  })
}

export function update (previous: VirtualElement, next: VirtualElement): void {
  next.patch(previous)
}

export function move (node: HTMLElement, previous: VirtualElement, next: VirtualElement, index: number): void {
  const child: Element = previous.node
  insert(node, child, index)
  next.patch(previous)
}

export function remove (node: HTMLElement, previous: VirtualElement): void {
  const child: Element = previous.node
  previous.predestroy(child)
  node.removeChild(child)
  previous.destroy()
}
