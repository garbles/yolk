/* @flow */

import {VirtualNode} from './VirtualNode'
import {VirtualText} from './VirtualText'
import {createElement} from './createElement'

export function createChildren (node: HTMLElement, children: Array<VirtualNode | VirtualText>): void {
  const len: number = children.length
  let i: number = -1

  while (++i < len) {
    const vchild: VirtualNode | VirtualText = children[i]
    const child: HTMLElement | Text = createElement(vchild)
    node.appendChild(child)
  }
}
