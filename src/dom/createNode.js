/* @flow */

import document from 'global/document'
import {VirtualElement} from './VirtualElement'

export function createNode (vnode: VirtualElement): HTMLElement {
  const node: HTMLElement = document.createElementNS(vnode.namespace, vnode.tagName)
  vnode.create(node)
  return node
}
