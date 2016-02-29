/* @flow */

import {batchInsertMessages} from './batchInsertMessages'
import {isDefined} from '../util/isDefined'

// TODO: just use createPatchChildren here
export function render (vnode, container) {
  batchInsertMessages(queue => {
    vnode.initialize()
    const node = vnode.nodeProxy._node // TODO: refactor

    if (container.children.length > 1) {
      container.innerHTML = ``
    }

    const replaced = container.children[0]

    if (isDefined(replaced)) {
      container.replaceChild(node, replaced)
    } else {
      container.appendChild(node)
    }

    queue.push(vnode)
  })
}
