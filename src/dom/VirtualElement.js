/* @flow */

import document from 'global/document'
import {Subject} from 'rxjs/Subject'
import {createCompositeSubject} from '../rx/createCompositeSubject'
import {createObservableFromObject} from '../rx/createObservableFromObject'
import {createObservableFromArray} from '../rx/createObservableFromArray'
import {patchChildren} from './patchChildren'
import {patchProperties} from './patchProperties'
import {emitMount, emitUnmount} from './mountable'

const NO_PROPERTIES = Object.freeze({})
const NO_CHILDREN = Object.freeze([])

const createCompositeObjectSubject = createCompositeSubject(createObservableFromObject)
const createCompositeArraySubject = createCompositeSubject(createObservableFromArray)

export class VirtualElement {
  tagName: string;
  key: string | void;
  namespace: string | void;
  props: Object;
  props$: Subject<Object>;
  children: Array<VirtualNode>;
  children$: Subject<Array<VirtualNode>>;
  constructor (tagName: string, props?: Object, children?: Array<VirtualNode>, key?: string, namespace?: string) {
    this.tagName = tagName
    this.props = props || NO_PROPERTIES
    this.children = children || NO_CHILDREN
    this.key = key
    this.namespace = namespace
  }

  init (): HTMLElement {
    return document.createElementNS(this.namespace, this.tagName)
  }

  create (node: HTMLElement): void {
    const props$: Subject<Object> = this.props$ = createCompositeObjectSubject(this.props)
    const children$: Subject<Array<VirtualNode>> = this.children$ = createCompositeArraySubject(this.children)

    // wrap this
    let previousProps: Object = {}
    let previousChildren: Array<VirtualNode> = []

    props$
      .subscribe((next: Object): void => {
        previousProps = patchProperties(node, next, previousProps)
      })

    children$
      .subscribe((next: Array<VirtualNode>): void => {
        previousChildren = patchChildren(node, next, previousChildren)
      })
  }

  insert (node: HTMLElement): void {
    emitMount(node, this.props.onMount)
  }

  patch (next: Object, __node: HTMLElement): void {
    this.props$.next(next.props)
    this.children$.next(next.children)
  }

  predestroy (__node: HTMLElement): void {}
  destroy (): void {}
}
