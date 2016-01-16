/* @flow */

import document from 'global/document'
import {Subject} from 'rxjs/Subject'
import {patchChildren} from './patchChildren'
import {patchProperties} from './patchProperties'
import {parseTag} from './parseTag'
import {emitMount, emitUnmount} from './mountable'
import {copyPropsWithWrappedEventHandlers} from './eventHandler'
import {createCompositeSubject} from '../rx/createCompositeSubject'
import {createObservableFromObject} from '../rx/createObservableFromObject'
import {createObservableFromArray} from '../rx/createObservableFromArray'
import {flatten} from '../util/flatten'

import 'rxjs/add/operator/map'

const TAG_IS_ONLY_LETTERS = /^[a-zA-Z]*$/

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
  constructor (tagName: string, props: Object, children: Array<VirtualNode>, key?: string, namespace?: string) {
    this.tagName = tagName
    this.props = props
    this.children = children
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
      .map(flatten)
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

  predestroy (node: HTMLElement): void {
    emitUnmount(node, this.props.onUnmount)
  }

  destroy (): void {}
}

export function createElement (_tagName: string, _props: Object, children: Array<VirtualNode | Observable>): VirtualElement {
  const props = copyPropsWithWrappedEventHandlers(_props)
  const tagName = parseTag(_tagName, props)

  const key: string = props.key
  const namespace: string = props.namespace

  delete props.key
  delete props.namespace


  return new VirtualElement(tagName, props, children, key, namespace)
}
