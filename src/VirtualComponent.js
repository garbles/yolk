/* @flow */

import cuid from 'cuid'

import {createEventHandler} from './createEventHandler'
import {createComponentProps} from './createComponentProps'
import {createCompositeSubject} from './createCompositeSubject'
import {createObservableFromArray} from './createObservableFromArray'
import {$$virtual, $$componentUid} from './symbol'
import {set} from './set'

import type {Observable} from 'rxjs/Observable'
import type {Subject} from 'rxjs/Subject'
import type {ElementProxy} from './ElementProxy'
import type {VirtualNode} from './types'

const createCompositeArraySubject = createCompositeSubject(createObservableFromArray)

const appendUidToComponent = (fn: Function): string => {
  if (!fn[$$componentUid]) {
    fn[$$componentUid] = cuid()
  }

  return fn[$$componentUid]
}

export class VirtualComponent {
  key: string | void;
  tagName: string;
  _props: Object;
  _children: Array<Observable|VirtualNode>;
  _fn: Function;
  _eventHandlers: Array<Subject>;
  _props$: Subject<Object>;
  _children$: Subject<Array<Observable|VirtualNode>>;
  _instance: VirtualNode;

  constructor (fn: Function, tagName: string, props: Object, children: Array<VirtualNode>, key?: string) {
    this.key = key
    this.tagName = tagName
    this._fn = fn
    this._props = props
    this._children = children
    this._eventHandlers = []
  }

  getProxy (): ElementProxy {
    return this._instance.getProxy()
  }

  initialize (): void {
    const props = this._props$ = createComponentProps(this._props)
    const children = this._children$ = createCompositeArraySubject(this._children)

    const _createEventHandler = (...args) => {
      const handler = createEventHandler(...args)
      this._eventHandlers.push(handler)
      return handler
    }

    const instance = this._instance = this._fn.call(null, {props: props.asObject(), children, createEventHandler: _createEventHandler})
    instance.initialize()
  }

  afterInsert (): void {
    this._instance.afterInsert()
  }

  patch (next: VirtualComponent): void {
    next._eventHandlers = this._eventHandlers
    next._instance = this._instance
    next._props$ = this._props$
    next._children$ = this._children$

    this._eventHandlers = []
    this._instance = null
    this._props$ = null
    this._children$ = null

    next._props$.next(next._props)
    next._children$.next(next._children)
  }

  beforeDestroy (): void {
    this._instance.beforeDestroy()
  }

  destroy (): void {
    this._eventHandlers.forEach(h => !h.hasCompleted && h.complete())
    this._instance.destroy()
    this._children.forEach(c => c.destroy())
  }

  insertChild (__child: any, __index: any): void {}
  moveChild (__child: any, __index: any): void {}
  removeChild (__child: any): void {}

  static create (fn: Function, props: Object, children: Array<Observable|VirtualNode>): VirtualComponent {
    const uid = appendUidToComponent(fn)

    return new VirtualComponent(fn, uid, props, children, props.key)
  }
}

set(VirtualComponent.prototype, $$virtual, true)
