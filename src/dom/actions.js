/* @flow */

import {createElement} from './createElement'
import {isDefined} from '../util/isDefined'

export const create = (node: HTMLElement, next: VirtualNode, index: number): Function => (children: Array<VirtualNode>): void => {
  const child: Node = createElement(next)
  const before: Node = node.children[index]

  if (isDefined(before)) {
    node.insertBefore(child, before)
    children.splice(index, 0, next)
  } else {
    node.appendChild(child)
    children.push(next)
  }

  next.insert(child) // queue up
}

export const update = (node: HTMLElement, previous: VirtualNode, next: VirtualNode, index: number): Function => (children: Array<VirtualNode>): void => {
  const child: Node = node.children[index]
  previous.patch(next, child)
  children.splice(index, 0, previous)
}

export const move = (node: HTMLElement, previous: VirtualNode, next: VirtualNode, oldIndex: number, newIndex: number): Function => {
  const child: Node = node.children[oldIndex]

  return (children: Array<VirtualNode>): void => {
    const before: Node = node.children[newIndex]

    if (isDefined(before)) {
      node.insertBefore(child, before)
      children.splice(newIndex, 0, previous)
    } else {
      node.appendChild(child)
      children.push(previous)
    }

    previous.patch(next, child)
  }
}

export const remove = (node: HTMLElement, previous: VirtualNode, index: number): Function => {
  const child: Node = node.children[index]

  return (): void => {
    previous.predestroy(child)
    node.removeChild(child)
    previous.destroy()
  }
}
