/* @flow */

import document from 'global/document'
import cuid from 'cuid'
import {createEventHandler} from 'yolk/createEventHandler'
import {createComponentProps} from 'yolk/createComponentProps'
import {createCompositeSubject} from 'yolk/createCompositeSubject'
import {createObservableFromArray} from 'yolk/createObservableFromArray'
import {$$virtual, $$componentUid} from 'yolk/symbol'

const createCompositeArraySubject = createCompositeSubject(createObservableFromArray)

export class VirtualComponent {
  constructor (fn: string, tagName: string, props: Object, children: Array<VirtualNode>, key?: string) {
    this.key = key
    this.tagName = tagName
    this._fn = fn
    this._props = props
    this._children = children
    this._eventHandlers = []
    this._instance = null
    this._props$ = null
    this._children$ = null
  }

  getNodeProxy (): NodeProxy {
    return this._instance.getNodeProxy()
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

  patch (next): void {
    next._eventHandlers = this._eventHandlers
    next._nodeProxy = this._nodeProxy
    next._instance = this._instance
    next._props$ = this._props$
    next._children$ = this._children$

    this._eventHandlers = null
    this._nodeProxy = null
    this._instance = null
    this._props$ = null
    this._children$ = null

    next._props$.next(next.props)
    next._children$.next(next.children)
  }

  beforeDestroy (): void {
    this._instance.beforeDestroy()
  }

  destroy (): void {
    this._eventHandlers.forEach(h => !h.hasCompleted && h.complete())
    this._instance.destroy()
    this._children.forEach(c => c.destroy())
  }

  insertChild (child, index): void {}
  moveChild (child, index): void {}
  removeChild (child): void {}
}

VirtualComponent.prototype[$$virtual] = true

const appendUidToComponent = fn => {
  if (!fn[$$componentUid]) {
    fn[$$componentUid] = cuid()
  }

  return fn[$$componentUid]
}

export function createComponent (fn, props, children) {
  const uid = appendUidToComponent(fn)

  return new VirtualComponent(fn, uid, props, children, props.key)
}
