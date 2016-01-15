/* @flow */

import {batchInsertMessages, queueInsertMessage} from './batchInsertMessages'

export function render (vnode: VirtualNode, container: HTMLElement): void {
  batchInsertMessages(() => {
    const node: HTMLElement = vnode.init()
    queueInsertMessage(vnode, node)
    vnode.create(node)
    container.appendChild(node)
  })
}
