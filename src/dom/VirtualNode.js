/* @flow */

import {Subject} from 'rxjs/Subject'
import {VirtualText} from './VirtualText'
import {createCompositeSubject} from '../rx/createCompositeSubject'
import {createObservableFromObject} from '../rx/createObservableFromObject'
import {patchProperties} from './patchProperties'

// import {createObservableFromArray} from '..rx/createObservableFromArray'

const NO_PROPERTIES = Object.freeze({})
const NO_CHILDREN = Object.freeze([])

const createCompositeObjectSubject = createCompositeSubject(createObservableFromObject)

export class VirtualNode {
  tagName: string;
  props: Object;
  props$: Subject;
  children: Array<VirtualNode|VirtualText>;
  key: string|void;
  namespace: string|void;
  constructor (tagName: string, props?: Object, children?: Array<VirtualNode|VirtualText>, key?: string, namespace?: string) {
    this.tagName = tagName
    this.props = props || NO_PROPERTIES
    this.children = children || NO_CHILDREN
    this.key = key
    this.namespace = namespace
  }

  create (node: Element): void {
    const props$: Subject = this.props$ = createCompositeObjectSubject(this.props)

    // wrap this
    let previous: Object = {}

    props$.subscribe((next: Object): void => {
      patchProperties(node, next, previous)
      previous = next
    })
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
