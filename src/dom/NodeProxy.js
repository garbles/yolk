import {descriptors} from './propertyDescriptors'
import {addEventListener, removeEventListener} from './eventDelegator'
import {emitMount, emitUnmount} from './mountable'
import {isDefined} from '../util/isDefined'

export class NodeProxy {
  _node: Element;
  patchProperties: Function;
  patchChildren: Function;

  constructor (tagName: string, namespace: string) {
    const node = this._node = document.createElementNS(namespace, tagName)
  }

  emitMount (fn) {
    emitMount(this._node, fn)
  }

  emitUnmount (fn) {
    emitUnmount(this._node, fn)
  }

  insertChild (childProxy: NodeProxy, index: number) {
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
      // FIXME
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
      // FIXME
      removeEventListener(node, computed)
      return
    }

    node[computed] = undefined
  }
}
