/* @flow */

import {VirtualText} from './VirtualText'

const NO_PROPERTIES = Object.freeze({})
const NO_CHILDREN = Object.freeze([])

export class VirtualNode {
  tagName: string;
  props: Object;
  children: Array<VirtualNode|VirtualText>;
  key: string|void;
  namespace: string|void;
  constructor (tagName: string, props?: Object, children?: Array<VirtualNode|VirtualText>, key?: string, namespace?: string) {
    this.tagName = tagName
    this.props = props || NO_PROPERTIES
    this.children = children || NO_CHILDREN
    this.key = key
    this.namespace = namespace
    Object.freeze(this)
  }

  create (node: Element): void {
    node
  }

  insert (node: Element): void {
    node
  }

  prepatch (previous: VirtualNode, next: VirtualNode, node: Element): void {
    previous; next; node
  }

  patch (previous: VirtualNode, next: VirtualNode, node: Element): void {
    previous; next; node
  }

  postpatch (previous: VirtualNode, next: VirtualNode, node: Element): void {
    previous; next; node
  }

  predestroy (node: Element): void {
    node
  }

  destroy (): void {
  }
}
