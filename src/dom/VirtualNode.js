/* @flow */

import document from 'global/document'
import {Observable} from 'rxjs/Observable'
import {Subject} from 'rxjs/Subject'
import {NodeProxy} from './NodeProxy'
import {wrapText} from './wrapText'
import {parseTag} from './parseTag'
import {wrapEventHandlers} from './wrapEventHandlers'
import {batchInsertMessages} from './batchInsertMessages'
import {createPatchProperties} from './createPatchProperties'
import {createPatchChildren} from './createPatchChildren'
import {createCompositeSubject} from '../rx/createCompositeSubject'
import {createObservableFromObject} from '../rx/createObservableFromObject'
import {createObservableFromArray} from '../rx/createObservableFromArray'
import {flatten} from '../util/flatten'

import 'rxjs/util/SymbolShim'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/switchMap'

const createCompositeObjectSubject = createCompositeSubject(createObservableFromObject)
const createCompositeArraySubject = createCompositeSubject(createObservableFromArray)

export const VirtualNodeSymbol = Symbol.for(`@@VirtualNode`)

export class VirtualNode {
  key: string;
  _tagName: string;
  _nodeProxy: NodeProxy;
  _props: Object;
  _props$: Subject<Object>;
  _children: Array<VirtualNode>;
  _children$: Subject<Array<VirtualNode>>;
  constructor (tagName: string, props: Object, children: Array<VirtualNode>, key?: string) {
    this.key = key
    this._tagName = tagName
    this._props = props
    this._children = children
    this._nodeProxy = null
    this._props$ = null
    this._children$ = null
  }

  get [VirtualNodeSymbol] (): bool {
    return true
  }

  getNodeProxy (): NodeProxy {
    return this._nodeProxy
  }

  initialize (): void {
    const nodeProxy: NodeProxy = this._nodeProxy = NodeProxy.createElement(this._tagName)
    const props$: Subject<Object> = this._props$ = createCompositeObjectSubject(this._props)
    const children$: Subject<Array<VirtualNode>> = this._children$ = createCompositeArraySubject(this._children)

    props$
      .subscribe(createPatchProperties(nodeProxy))

    children$
      .map(flatten)
      .map(wrapText)
      .subscribe(createPatchChildren(this))
  }

  insertChild (next, index): void {
    return batchInsertMessages(queue => {
      next.initialize()
      this._nodeProxy.insertChild(next.getNodeProxy(), index)
      queue.push(next)
    })
  }

  moveChild (previous, next, index): void {
    this._nodeProxy.insertChild(previous.getNodeProxy(), index)
    next.patch(previous)
  }

  afterInsert (): void {
    this._nodeProxy.emitMount(this._props.onMount)
  }

  patch (previous: VirtualNode): void {
    this._nodeProxy = previous.getNodeProxy()
    this._props$ = previous._props$
    this._children$ = previous._children$
    previous._nodeProxy = null
    previous._props$ = null
    previous._children$ = null

    this._props$.next(this._props)
    this._children$.next(this._children)
  }

  removeChild (child): void {
    child.beforeDestroy()
    this._nodeProxy.removeChild(child.getNodeProxy())
    child.destroy()
  }

  beforeDestroy (): void {
    this._nodeProxy.emitUnmount(this._props.onUnmount)
  }

  destroy (): void {}
}

export function createElement (_tagName: string, _props: Object, children: Array<VirtualNode | Observable>): VirtualNode {
  const props = wrapEventHandlers(_props)
  const tagName = parseTag(_tagName, props)

  const key: string = props.key || null
  const namespace: string = props.namespace || null

  props.key = null
  props.namespace = null

  return new VirtualNode(tagName, props, children, key, namespace)
}
