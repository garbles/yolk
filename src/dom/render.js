/* @flow */

import {batchInsertMessages} from './batchInsertMessages'
import {isDefined} from '../util/isDefined'

export const render = batchInsertMessages.bind(null, (queue, vnode, container) => {
  const node: HTMLElement = vnode.create()
  const replaced = container.children[0]

  if (isDefined(replaced)) {
    container.replaceChild(node, replaced)
  } else {
    container.appendChild(node)
  }

  queue.push(vnode)
})
