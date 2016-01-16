/* @flow */

import {batchInsertMessages, queueInsertMessage} from './batchInsertMessages'
import {isDefined} from '../util/isDefined'

export const render = batchInsertMessages.bind(null, (vnode, container) => {
  const node: HTMLElement = vnode.init()
  const replaced = container.children[0]

  queueInsertMessage(vnode, node)
  vnode.create(node)

  if (isDefined(replaced)) {
    container.replaceChild(node, replaced)
  } else {
    container.appendChild(node)
  }
})
