/* @flow */

import {createElement} from './createElement'
import {VirtualNode} from './VirtualNode'
import {VirtualText} from './VirtualText'

export function render (vnode: VirtualNode | VirtualText, container: HTMLElement): void {
  const node = createElement(vnode)
  container.appendChild(node)
}
