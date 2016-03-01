/* @flow */

import {batchInsertMessages} from './batchInsertMessages'
import {NodeProxy} from './NodeProxy'
import {isDefined} from '../util/isDefined'

export function render (vnode, selector) {
  const containerProxy = NodeProxy.querySelector(selector)

  batchInsertMessages(queue => {
    vnode.initialize()
    containerProxy.replaceChild(vnode.getNodeProxy(), 0)
    queue.push(vnode)
  })
}
