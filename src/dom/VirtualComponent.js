/* @flow */

import document from 'global/document'
import {VirtualSymbol} from './VirtualSymbol'
import {createEventHandler} from './createEventHandler'
import {createComponentProps} from './createComponentProps'
import {uuid} from '../util/uuid'
import {createCompositeSubject} from '../rx/createCompositeSubject'
import {createObservableFromArray} from '../rx/createObservableFromArray'

const createCompositeArraySubject = createCompositeSubject(createObservableFromArray)

export class VirtualComponent {
  constructor (fn: string, props: Object, children: Array<VirtualNode>, key?: string) {
    this.key = key
    this._fn = fn
    this._props = props
    this._children = children
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
    const instance = this._instance = this._fn.call(null, {props: props.asObject(), children, createEventHandler})
    instance.initialize()
  }

  afterInsert (): void {
    this._instance.afterInsert()
  }

  patch (next): void {
    next._nodeProxy = this._nodeProxy
    next._props$ = this._props$
    next._children$ = this._children$

    next._props$.next(next.props)
    next._children$.next(next.children)
  }

  beforeDestroy (): void {
    this._instance.beforeDestroy()
  }

  destroy (): void {
    // dispose of observables, children
  }

  insertChild (child, index): void {}
  moveChild (child, index): void {}
  removeChild (child): void {}
}

VirtualComponent.prototype[VirtualSymbol] = true

const YOLK_COMPONENT_UID_TAG = `__YOLK_COMPONENT_UID__`

const appendUidToComponent = fn => {
  if (!fn[YOLK_COMPONENT_UID_TAG]) {
    fn[YOLK_COMPONENT_UID_TAG] = uuid()
  }

  return fn[YOLK_COMPONENT_UID_TAG]
}

export function createComponent (fn, props, children) {
  const uid = appendUidToComponent(fn)
  const key = props.key || uid

  return new VirtualComponent(fn, props, children, key)
}
