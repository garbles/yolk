/* @flow */

import {createElement} from './createElement'
import {batchInsertMessages} from './batchInsertMessages'
import {isDefined} from '../util/isDefined'

export const create =
(next: VirtualNode, index: number): Function =>
(node: HTMLElement): Function =>
(children: Array<VirtualNode>): Array<VirtualNode> => {
  return batchInsertMessages(queue => {
    const child: Node = createElement(next)
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
(previous: VirtualNode, next: VirtualNode, index: number): Function =>
(node: HTMLElement): Function =>
(children: Array<VirtualNode>): Array<VirtualNode> => {
  const child: Node = node.children[index]
  previous.patch(next, child)
  children.splice(index, 0, previous)

  return children
}

export const move =
(previous: VirtualNode, next: VirtualNode, oldIndex: number, newIndex: number): Function =>
(node: HTMLElement): Function => {
  const child: Node = node.children[oldIndex]

  return (children: Array<VirtualNode>): Array<VirtualNode> => {
    const before: Node = node.children[newIndex]

    if (isDefined(before)) {
      node.insertBefore(child, before)
      children.splice(newIndex, 0, previous)
    } else {
      node.appendChild(child)
      children.push(previous)
    }

    previous.patch(next, child)

    return children
  }
}

export const remove =
(previous: VirtualNode, index: number): Function =>
(node: HTMLElement): Function => {
  const child: Node = node.children[index]

  return (children: Array<VirtualNode>): Array<VirtualNode> => {
    previous.predestroy(child)
    node.removeChild(child)
    previous.destroy()

    return children
  }
}
