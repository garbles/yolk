/* @flow */

import document from 'global/document'
import {Observable} from 'rxjs/Observable'
import {Subject} from 'rxjs/Subject'
import {NodeProxy} from './NodeProxy'
import {wrapText} from './wrapText'
import {parseTag} from './parseTag'
import {VirtualSymbol} from './VirtualSymbol'
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

  insertChild (child, index): void {
    return batchInsertMessages(queue => {
      child.initialize()
      this._nodeProxy.insertChild(child.getNodeProxy(), index)
      queue.push(child)
    })
  }

  patch (next: VirtualNode): void {
    this._props$.next(next._props)
    this._children$.next(next._children)
  }

  moveChild (child, index): void {
    this._nodeProxy.insertChild(child.getNodeProxy(), index)
  }

  afterInsert (): void {
    this._nodeProxy.emitMount(this._props.onMount)
  }

  removeChild (child): void {
    child.beforeDestroy()
    this._nodeProxy.removeChild(child.getNodeProxy())
    child.destroy()
  }

  beforeDestroy (): void {
    this._nodeProxy.emitUnmount(this._props.onUnmount)
  }

  destroy (): void {
    // dispose of observables, children
  }
}

VirtualNode.prototype[VirtualSymbol] = true

export function createElement (_tagName: string, _props: Object, children: Array<VirtualNode | Observable>): VirtualNode {
  const props = wrapEventHandlers(_props)
  const tagName = parseTag(_tagName, props)

  const key: string = props.key || null

  props.key = null

  return new VirtualNode(tagName, props, children, key)
}
