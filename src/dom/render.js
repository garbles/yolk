/* @flow */

import {batchInsertMessages} from './batchInsertMessages'
import {isDefined} from '../util/isDefined'

export function render (vnode, container) {
  const node: HTMLElement = vnode.createElement()

  batchInsertMessages(queue => {
    vnode.initialize(node)

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
