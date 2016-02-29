import {createPatchProperties} from './createPatchProperties'
import {emitMount, emitUnmount} from './mountable'
import {isDefined} from '../util/isDefined'

export class NodeProxy {
  _node: Element;
  patchProperties: Function;
  patchChildren: Function;

  constructor(tagName: string, namespace: string) {
    const node = this._node = document.createElementNS(namespace, tagName)

    this.patchProperties = createPatchProperties(node)
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
}
