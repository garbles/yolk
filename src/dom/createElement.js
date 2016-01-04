/* @flow */

import document from 'global/document'
import {VirtualNode} from './VirtualNode'
import {VirtualText} from './VirtualText'
import {applyProperties} from './applyProperties'
import {createChildren} from './createChildren'

function createTextNode (vnode: VirtualText): Text {
  return document.createTextNode(vnode.text)
}

function createElementNS (vnode: VirtualNode): HTMLElement {
  const node = document.createElementNS(vnode.namespace, vnode.tagName)

  applyProperties(node, vnode.props)
  createChildren(node, vnode.children)

  vnode.create(node)

  return node
}

export function createElement (vnode: VirtualNode | VirtualText): HTMLElement | Text {
  if (vnode instanceof VirtualText) {
    return createTextNode(vnode)
  }

  return createElementNS(vnode)
}
