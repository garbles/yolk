/* @flow */

import {VirtualNode} from './VirtualNode'
import {VirtualText} from './VirtualText'
import {createElement} from './createElement'

export function patchChildren (node: Object, next: Array<VirtualNode | VirtualText>, previous?: Array<VirtualNode | VirtualText> = []): void {
  const nextLen = next.length
  const previousLen = previous.length
  const len = Math.max(nextLen, previousLen)
  let i = -1

  while (++i < len) {
    const right: VirtualNode | VirtualText | void = next[i]
    const left: VirtualNode | VirtualText | void = previous[i]

    if (!left && right) {
      const child: HTMLElement | Text = createElement(right)
      node.appendChild(child)
      continue
    }
  }
}
