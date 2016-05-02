/* @flow */

import {batchInsertMessages} from './batchInsertMessages'
import {NodeProxy} from './NodeProxy'
import {isDefined} from './is'
import {$$root} from './symbol'
import {get} from './get'
import {set} from './set'

import type {VirtualElement} from './types'

export function render (vnode: VirtualElement, node: HTMLElement): void {
  const containerProxy: NodeProxy = NodeProxy.fromElement(node)
  const previous: VirtualElement = get(node, $$root)

  if (isDefined(previous)) {
    if (previous.tagName === vnode.tagName) {
      previous.patch(vnode)
    } else {
      previous.destroy()
    }
  }

  batchInsertMessages(queue => {
    vnode.initialize()
    containerProxy.replaceChild(vnode.getProxy(), 0)
    queue.push(vnode)
  })

  set(node, $$root, vnode)
}
