/* @flow */

import {createElement} from './createElement'

export function render (vnode: VirtualNode, container: HTMLElement): void {
  const node = createElement(vnode)
  container.appendChild(node)
}
