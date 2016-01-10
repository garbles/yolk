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

export class VirtualElement {
  tagName: string;
  props: Object;
  props$: Subject<Object>;
  children: Array<VirtualElement | VirtualText>;
  children$: Subject<Array<VirtualElement | VirtualText>>;
  key: string | void;
  namespace: string | void;
  constructor (tagName: string, props?: Object, children?: Array<VirtualElement | VirtualText>, key?: string, namespace?: string) {
    this.tagName = tagName
    this.props = props || NO_PROPERTIES
    this.children = children || NO_CHILDREN
    this.key = key
    this.namespace = namespace
  }

  init (): HTMLElement {
    return document.createElementNS(this.namespace, this.tagName)
  }

  create (node: Object): void {
    const props$: Subject<Object> = this.props$ = createCompositeObjectSubject(this.props)
    const children$: Subject<Array<VirtualElement | VirtualText>> = this.children$ = createCompositeArraySubject(this.children)

    // wrap this
    let previousProps: Object = {}
    let previousChildren: Array<VirtualElement | VirtualText> = []

    props$
      .subscribe((next: Object): void => {
        previousProps = patchProperties(node, next, previousProps)
      })

    children$
      .subscribe((next: Array<VirtualElement | VirtualText>): void => {
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
