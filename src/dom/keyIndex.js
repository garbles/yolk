/* @flow */

import {VirtualElement} from './VirtualElement'
import {VirtualText} from './VirtualText'

export function keyIndex (children: Array<VirtualElement | VirtualText>): Array<Object> {
  const len: number = children.length
  const arr: Array<Object> = []
  let i: number = -1

  while (++i < len) {
    const child: VirtualElement | VirtualText = children[i]

    if (!child) {
      continue
    }

    arr.push({
      key: child.key || child.tagName,
      vnode: child,
      index: i,
    })
  }

  return arr
}
