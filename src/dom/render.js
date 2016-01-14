/* @flow */

import {createElement} from './createElement'
import {queueInsertMessage, batchInsertMessages} from './batchInsertMessages'

export function render (vnode: VirtualNode, container: HTMLElement): void {
  const node: HTMLElement = vnode.init()

  batchInsertMessages(() => {
    queueInsertMessage(vnode, node)
    vnode.create(node)
    container.appendChild(node)
  })
}
