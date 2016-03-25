/* @flow */

import document from 'global/document'
import {VirtualSymbol} from './VirtualSymbol'
import {createEventHandler} from './createEventHandler'
import {uuid} from '../util/uuid'

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
    const keys = Object.keys(this._props)
    const len = keys.length
    const props = this._props$ = {}
    const children = this._children
    let i: number = -1

    while (++i < len) {
      const key: string = keys[i]
      props[key] = asObservable(this._props[key])
    }

    const instance = this._instance = this._fn.call(null, {props, children, createEventHandler})
    instance.initialize()
  }

  patch (next): void {
    // patch props
    // patch children?
  }

  insertChild (child, index): void {
    // append children and push
  }

  moveChild (child, index): void {
    // adjust children and push
  }

  removeChild (child): void {
    // adjust children and push
  }

  destroy (): void {
    // dispose of observables, eventhandlers, children
  }

  afterInsert (): void {}
  beforeDestroy (): void {}
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
