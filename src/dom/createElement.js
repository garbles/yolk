/* @flow */

import {VirtualElement} from './VirtualElement'
import {VirtualText} from './VirtualText'

export function createElement (vnode: VirtualElement | VirtualText): HTMLElement | Text {
  const node: HTMLElement | Text = vnode.init()
  vnode.create(node)
  return node
}
