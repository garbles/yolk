/* @flow */

import {batchInsertMessages} from 'yolk/batchInsertMessages'
import {NodeProxy} from 'yolk/NodeProxy'
import {isDefined} from 'yolk/isDefined'

export function render (vnode, selector) {
  const containerProxy = NodeProxy.querySelector(selector)

  batchInsertMessages(queue => {
    vnode.initialize()
    containerProxy.replaceChild(vnode.getNodeProxy(), 0)
    queue.push(vnode)
  })
}
