/* @flow */

import {createElement} from './createElement'
import {VirtualElement} from './VirtualElement'
import {VirtualText} from './VirtualText'

export function render (vnode: VirtualElement | VirtualText, container: HTMLElement): void {
  const node = createElement(vnode)
  container.appendChild(node)
}
