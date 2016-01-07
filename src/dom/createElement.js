/* @flow */

import {VirtualNode} from './VirtualNode'
import {VirtualText} from './VirtualText'

export function createElement (vnode: VirtualNode | VirtualText): HTMLElement | Text {
  const node: HTMLElement | Text = vnode.init()
  vnode.create(node)
  return node
}
