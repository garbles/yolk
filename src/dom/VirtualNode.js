/* @flow */

import document from 'global/document'
import {Subject} from 'rxjs/Subject'
import {VirtualText} from './VirtualText'
import {createCompositeSubject} from '../rx/createCompositeSubject'
import {createObservableFromObject} from '../rx/createObservableFromObject'
import {createObservableFromArray} from '../rx/createObservableFromArray'
import {patchChildren} from './patchChildren'
import {patchProperties} from './patchProperties'
import {updateChildrenKeys} from './updateChildrenKeys'

import 'rxjs/add/operator/map'

const NO_PROPERTIES = Object.freeze({})
const NO_CHILDREN = Object.freeze([])

const createCompositeObjectSubject = createCompositeSubject(createObservableFromObject)
const createCompositeArraySubject = createCompositeSubject(createObservableFromArray)

export class VirtualNode {
  tagName: string;
  props: Object;
  props$: Subject<Object>;
  children: Array<VirtualNode | VirtualText>;
  children$: Subject<Array<VirtualNode | VirtualText>>;
  key: string | void;
  namespace: string | void;
  constructor (tagName: string, props?: Object, children?: Array<VirtualNode | VirtualText>, key?: string, namespace?: string) {
    this.tagName = tagName
    this.key = key
    this.props = props || NO_PROPERTIES
    this.children = children || NO_CHILDREN
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

    props$
      .subscribe((next: Object): void => {
        patchProperties(node, next, previousProps)
        previousProps = next
      })

    children$
      .map(updateChildrenKeys)
      .subscribe((next: Array<VirtualNode | VirtualText>): void => {
        previousChildren = patchChildren(node, next, previousChildren)
      })
  }

  insert (__node: Object): void {}

  patch (next: Object, __node: Object): void {
    this.props$.next(next.props)
    this.children$.next(next.children)
  }

  predestroy (__node: Object): void {}
  destroy (): void {}
}
