/* @flow */

import {VirtualNode} from './VirtualNode'
import {VirtualText} from './VirtualText'
import {createElement} from './createElement'

export function createChildren (node: Element, children: Array<VirtualNode | VirtualText>): void {
  const len = children.length
  let i = -1

  while (++i < len) {
    const vchild = children[i]
    const child = createElement(vchild)
    node.appendChild(child)
  }
}
