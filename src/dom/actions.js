/* @flow weak */

import {VirtualElement} from './VirtualElement'
import {batchInsertMessages} from './batchInsertMessages'
import {isDefined} from '../util/isDefined'

export const create =
(next: VirtualElement, index: number) =>
(node: HTMLElement, children: Array<VirtualElement>): Array<VirtualElement> => {
  return batchInsertMessages(queue => {
    const child: HTMLElement = next.create()
    const before: Node = node.children[index]

    if (isDefined(before)) {
      node.insertBefore(child, before)
      children.splice(index, 0, next)
    } else {
      node.appendChild(child)
      children.push(next)
    }

    queue.push({vnode: next, node: child})

    return children
  })
}

export const update =
(previous: VirtualElement, next: VirtualElement, index: number) =>
(__node: HTMLElement, children: Array<VirtualElement>): Array<VirtualElement> => {
  previous.patch(next)
  children.splice(index, 0, previous)

  return children
}

export const move =
(previous: VirtualElement, next: VirtualElement, index: number) =>
(node: HTMLElement, children: Array<VirtualElement>): Array<VirtualElement> => {
  const child: Element = previous.node
  const before: Node = node.children[index]

  if (isDefined(before)) {
    node.insertBefore(child, before)
    children.splice(index, 0, previous)
  } else {
    node.appendChild(child)
    children.push(previous)
  }

  previous.patch(next)

  return children
}

export const remove =
(previous: VirtualElement) =>
(node: HTMLElement, children: Array<VirtualElement>): Array<VirtualElement> => {
  const child: Element = previous.node
  previous.predestroy(child)
  node.removeChild(child)
  previous.destroy()

  return children
}
