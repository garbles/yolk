/* @flow */

import document from 'global/document'
import {Observable} from 'rxjs/Observable'
import {Subject} from 'rxjs/Subject'
import {NodeProxy} from './NodeProxy'
import {maybeWrapText} from './maybeWrapText'
import {parseTag} from './parseTag'
import {emitMount, emitUnmount} from './mountable'
import {wrapEventHandlers} from './wrapEventHandlers'
import {batchInsertMessages} from './batchInsertMessages'
import {createPatchProperties} from './createPatchProperties'
import {createPatchChildren} from './createPatchChildren'
import {createCompositeSubject} from '../rx/createCompositeSubject'
import {createObservableFromObject} from '../rx/createObservableFromObject'
import {createObservableFromArray} from '../rx/createObservableFromArray'
import {flatten} from '../util/flatten'

import 'rxjs/add/operator/map'
import 'rxjs/add/operator/switchMap'

const createCompositeObjectSubject = createCompositeSubject(createObservableFromObject)
const createCompositeArraySubject = createCompositeSubject(createObservableFromArray)

export class VirtualElement {
  tagName: string;
  key: string;
  nodeProxy: NodeProxy;
  props: Object;
  props$: Subject<Object>;
  children: Array<VirtualElement>;
  children$: Subject<Array<VirtualElement>>;
  constructor (tagName: string, props: Object, children: Array<VirtualElement>, key?: string) {
    this.tagName = tagName
    this.props = props
    this.children = children
    this.key = key
    this.nodeProxy = null
    this.props$ = null
    this.children$ = null
  }

  initialize (): void {
    const nodeProxy: NodeProxy = this.nodeProxy = NodeProxy.createElement(this.tagName)
    const props$: Subject<Object> = this.props$ = createCompositeObjectSubject(this.props)
    const children$: Subject<Array<VirtualElement>> = this.children$ = createCompositeArraySubject(this.children)

    props$.subscribe(createPatchProperties(nodeProxy))

    children$
      .map(flatten)
      .map(maybeWrapText)
      .subscribe(createPatchChildren(this))
  }

  insertChild (next, index): void {
    return batchInsertMessages(queue => {
      next.initialize()
      this.nodeProxy.insertChild(next.nodeProxy, index)
      queue.push(next)
    })
  }

  moveChild (previous, next, index): void {
    this.nodeProxy.insertChild(previous.nodeProxy, index)
    next.patch(previous)
  }

  afterInsert (): void {
    this.nodeProxy.emitMount(this.props.onMount)
  }

  patch (previous: Object): void {
    this.nodeProxy = previous.nodeProxy
    this.props$ = previous.props$
    this.children$ = previous.children$
    previous.nodeProxy = null
    previous.props$ = null
    previous.children$ = null

    this.props$.next(this.props)
    this.children$.next(this.children)
  }

  removeChild (child): void {
    child.beforeDestroy()
    this.nodeProxy.removeChild(child.nodeProxy)
    child.destroy()
  }

  beforeDestroy (): void {
    this.nodeProxy.emitUnmount(this.props.onUnmount)
  }

  destroy (): void {}
}

export function createElement (_tagName: string, _props: Object, children: Array<VirtualElement | Observable>): VirtualElement {
  const props = wrapEventHandlers(_props)
  const tagName = parseTag(_tagName, props)

  const key: string = props.key || null
  const namespace: string = props.namespace || null

  props.key = null
  props.namespace = null

  return new VirtualElement(tagName, props, children, key, namespace)
}
