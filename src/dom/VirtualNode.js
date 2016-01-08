/* @flow */

import document from 'global/document'
import {Subject} from 'rxjs/Subject'
import {VirtualText} from './VirtualText'
import {createCompositeSubject} from '../rx/createCompositeSubject'
import {createObservableFromObject} from '../rx/createObservableFromObject'
import {createObservableFromArray} from '../rx/createObservableFromArray'
import {patchChildren} from './patchChildren'
import {patchProperties} from './patchProperties'

const NO_PROPERTIES = Object.freeze({})
const NO_CHILDREN = Object.freeze([])

const createCompositeObjectSubject = createCompositeSubject(createObservableFromObject)
const createCompositeArraySubject = createCompositeSubject(createObservableFromArray)

export class VirtualNode {
  tagName: string;
  props: Object;
  props$: Subject<Object>;
  children: Array<VirtualNode|VirtualText>;
  children$: Subject<Array<VirtualNode|VirtualText>>;
  key: string|void;
  namespace: string|void;
  constructor (tagName: string, props?: Object, children?: Array<VirtualNode|VirtualText>, key?: string, namespace?: string) {
    this.tagName = tagName
    this.props = props || NO_PROPERTIES
    this.children = children || NO_CHILDREN
    this.key = key
    this.namespace = namespace
  }

  init (): HTMLElement {
    return document.createElementNS(this.namespace, this.tagName)
  }

  // TODO: type this better
  create (node: Object): void {
    const props$: Subject<Object> = this.props$ = createCompositeObjectSubject(this.props)
    const children$: Subject<Array<VirtualNode | VirtualText>> = this.children$ = createCompositeArraySubject(this.children)

    // wrap this
    let previousProps: Object = {}
    let previousChildren: Array<VirtualNode | VirtualText> = []

    props$.subscribe((next: Object): void => {
      patchProperties(node, next, previousProps)
      previousProps = next
    })

    children$.subscribe((next: Array<VirtualNode | VirtualText>): void => {
      patchChildren(node, next, previousChildren)
      previousChildren = next
    })
  }

  // insert (node: Element): void {
  //   node
  // }

  // prepatch (previous: VirtualNode, next: VirtualNode, node: Element): void {
  //   previous; next; node
  // }

  // patch (previous: VirtualNode, next: VirtualNode, node: Element): void {
  //   previous; next; node
  // }

  // postpatch (previous: VirtualNode, next: VirtualNode, node: Element): void {
  //   previous; next; node
  // }

  // predestroy (node: Element): void {
  //   node
  // }

  // destroy (): void {
  // }
}
