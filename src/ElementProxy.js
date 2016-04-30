/* @flow */

import document from 'global/document'
import {descriptors} from './propertyDescriptors'
import {addEventListener, removeEventListener} from './eventDelegator'
import {emitMount, emitUnmount} from './mountable'
import {isDefined} from './is'
import {get} from './get'
import {set} from './set'
import {NodeProxy} from './types'

export class ElementProxy {
  _node: HTMLElement;

  constructor (node: HTMLElement) {
    this._node = node
  }

  emitMount (fn: Function): void {
    emitMount(this._node, fn)
  }

  emitUnmount (fn: Function): void {
    emitUnmount(this._node, fn)
  }

  children (): HTMLCollection {
    return this._node.children
  }

  replaceChild (childProxy: NodeProxy, index: number): void {
    const node = this._node
    const child = childProxy._node
    const replaced = node.children[index]

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

  removeChild (childProxy: NodeProxy): void {
    const node = this._node
    const child = childProxy._node
    node.removeChild(child)
  }

  getAttribute (key: string): any {
    const node = this._node
    const descriptor = get(descriptors, key)

    if (!descriptor) {
      return node.getAttribute(key)
    }

    if (descriptor.useEqualSetter) {
      return get(node, descriptor.computed)
    }

    return node.getAttribute(descriptor.computed)
  }

  setAttribute (key: string, value: any): void {
    const node = this._node
    const descriptor = get(descriptors, key)

    if (!descriptor) {
      node.setAttribute(key, value)
      return
    }

    const {computed} = descriptor

    if (descriptor.useEqualSetter) {
      set(node, computed, value)
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

  removeAttribute (key: string): void {
    const node = this._node
    const descriptor = get(descriptors, key)

    if (!descriptor) {
      node.removeAttribute(key)
      return
    }

    const {computed} = descriptor

    if (descriptor.useSetAttribute) {
      node.removeAttribute(computed)
      return
    }

    if (descriptor.hasBooleanValue) {
      set(node, computed, false)
      return
    }

    if (descriptor.useEventListener) {
      removeEventListener(node, computed)
      return
    }

    set(node, computed, undefined)
  }

  static createElement (tagName: string): ElementProxy {
    const node: HTMLElement = document.createElement(tagName)
    return new ElementProxy(node)
  }

  static querySelector (selector: string): ElementProxy {
    const node: HTMLElement = document.querySelector(selector)
    return new ElementProxy(node)
  }

  static fromElement (node: HTMLElement): ElementProxy {
    return new ElementProxy(node)
  }
}
