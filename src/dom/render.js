/* @flow */

import {batchInsertMessages, queueInsertMessage} from './batchInsertMessages'

function appendChild (vnode, node, container) {
  queueInsertMessage(vnode, node)
  vnode.create(node)
  container.appendChild(node)
}

export function render (vnode: VirtualNode, container: HTMLElement): void {
  const node: HTMLElement = vnode.init()
  batchInsertMessages(appendChild, vnode, node, container)
}
