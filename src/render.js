/* @flow */

import {batchInsertMessages} from 'yolk/batchInsertMessages'
import {NodeProxy} from 'yolk/NodeProxy'
import {isDefined} from 'yolk/isDefined'
import {$$root} from 'yolk/symbol'

export function render (vnode, selector) {
  const containerProxy = NodeProxy.querySelector(selector)
  const previous = containerProxy.getAttribute($$root)

  if (isDefined(previous)) {
    previous.destroy()
  }

  batchInsertMessages(queue => {
    vnode.initialize()
    containerProxy.replaceChild(vnode.getNodeProxy(), 0)
    queue.push(vnode)
  })

  containerProxy.setAttribute($$root, vnode)
}
