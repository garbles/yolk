/* @flow */

import document from 'global/document'
import {Observable} from 'rxjs/Observable'
import {Subject} from 'rxjs/Subject'
import {maybeWrapText} from './maybeWrapText'
import {parseTag} from './parseTag'
import {emitMount, emitUnmount} from './mountable'
import {wrapEventHandlers} from './wrapEventHandlers'
import {createPatchChildren} from './createPatchChildren'
import {createPatchProperties} from './createPatchProperties'
import {createCompositeSubject} from '../rx/createCompositeSubject'
import {createObservableFromObject} from '../rx/createObservableFromObject'
import {createObservableFromArray} from '../rx/createObservableFromArray'
import {flatten} from '../util/flatten'

import 'rxjs/add/operator/map'

const createCompositeObjectSubject = createCompositeSubject(createObservableFromObject)
const createCompositeArraySubject = createCompositeSubject(createObservableFromArray)

export class VirtualElement {
  tagName: string;
  key: string | void;
  namespace: string | void;
  node: HTMLElement;
  props: Object;
  props$: Subject<Object>;
  children: Array<VirtualElement>;
  children$: Subject<Array<VirtualElement>>;
  constructor (tagName: string, props: Object, children: Array<VirtualElement>, key?: string, namespace?: string) {
    this.tagName = tagName
    this.props = props
    this.children = children
    this.key = key
    this.namespace = namespace
  }

  create (): HTMLElement {
    const node: HTMLElement = this.node = document.createElementNS(this.namespace, this.tagName)
    const props$: Subject<Object> = this.props$ = createCompositeObjectSubject(this.props)
    const children$: Subject<Array<VirtualElement>> = this.children$ = createCompositeArraySubject(this.children)
    const patchProperties = createPatchProperties(node)
    const patchChildren = createPatchChildren(node)

    props$
      .subscribe(patchProperties)

    children$
      .map(flatten)
      .map(maybeWrapText)
      .subscribe(patchChildren)

    return node
  }

  insert (): void {
    emitMount(this.node, this.props.onMount)
  }

  patch (next: Object): void {
    this.props$.next(next.props)
    this.children$.next(next.children)
  }

  predestroy (): void {
    emitUnmount(this.node, this.props.onUnmount)
  }

  destroy (): void {}
}

export function createElement (_tagName: string, _props: Object, children: Array<VirtualElement | Observable>): VirtualElement {
  const props = wrapEventHandlers(_props)
  const tagName = parseTag(_tagName, props)

  const key: string = props.key
  const namespace: string = props.namespace

  delete props.key
  delete props.namespace

  return new VirtualElement(tagName, props, children, key, namespace)
}
