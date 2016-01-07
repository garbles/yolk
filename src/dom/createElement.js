/* @flow */

import document from 'global/document'
import {VirtualNode} from './VirtualNode'
import {VirtualText} from './VirtualText'

function createTextNode (vnode: VirtualText): Text {
  return document.createTextNode(vnode.text)
}

function createElementNS (vnode: VirtualNode): HTMLElement {
  const node = document.createElementNS(vnode.namespace, vnode.tagName)
  vnode.create(node)
  return node
}

export function createElement (vnode: VirtualNode | VirtualText): HTMLElement | Text {
  if (vnode instanceof VirtualText) {
    return createTextNode(vnode)
  }

  return createElementNS(vnode)
}
