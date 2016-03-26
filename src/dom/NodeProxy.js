import document from 'global/document'
import {descriptors} from './propertyDescriptors'
import {addEventListener, removeEventListener} from './eventDelegator'
import {emitMount, emitUnmount} from './mountable'
import {isDefined} from '../util/isDefined'
import {isFunction} from '../util/isFunction'

export class NodeProxy {
  _node: Element;

  constructor (node) {
    this._node = node
  }

  emitMount (fn) {
    emitMount(this._node, fn)
  }

  emitUnmount (fn) {
    emitUnmount(this._node, fn)
  }

  replaceChild (childProxy: NodeProxy, index: number): void {
    const node = this._node
    const child = childProxy._node
    const replaced = node.children[0]

    if (isDefined(replaced)) {
      node.replaceChild(child, replaced)
    } else {
      node.appendChild(child)
    }
  }

  insertChild (childProxy: NodeProxy, index: number): void {
    const node = this._node
    const child = childProxy._node
    const before: Node = node.children[index]

    if (isDefined(before)) {
      node.insertBefore(child, before)
    } else {
      node.appendChild(child)
    }
  }

  removeChild (childProxy: NodeProxy) {
    const node = this._node
    const child = childProxy._node
    node.removeChild(child)
  }

  setAttribute (key, value) {
    const node = this._node
    const descriptor = descriptors[key]

    if (!descriptor) {
      node[key] = value
      return
    }

    const {computed} = descriptor

    if (descriptor.useEqualSetter) {
      node[computed] = value
      return
    }

    if (descriptor.hasBooleanValue && !value) {
      node.removeAttribute(computed)
      return
    }

    if (descriptor.useEventListener) {
      addEventListener(node, computed, value)
      return
    }

    node.setAttribute(computed, value)
  }

  removeAttribute (key) {
    const node = this._node
    const descriptor = descriptors[key]

    if (!descriptor) {
      node[key] = undefined
      return
    }

    const {computed} = descriptor

    if (descriptor.useSetAttribute) {
      node.removeAttribute(computed)
      return
    }

    if (descriptor.hasBooleanValue) {
      node[computed] = false
      return
    }

    if (descriptor.useEventListener) {
      removeEventListener(node, computed)
      return
    }

    node[computed] = undefined
  }
}

NodeProxy.createElement = function createElement (tagName) {
  const node = document.createElement(tagName)
  return new NodeProxy(node)
}

NodeProxy.querySelector = function querySelector (selector) {
  const node = document.querySelector(selector)
  return new NodeProxy(node)
}
