/* @flow */

import {Observable} from 'rxjs/Observable'
import {VirtualNode} from './VirtualNode'
import {asObservable} from '../rx/asObservable'
import {createEventHandler} from './createEventHandler'

export function createComponent (fn: Function, _props: Object, children: Array<VirtualNode | Observable>): VirtualNode | Observable {
  const keys: Array<string> = Object.keys(_props)
  const len: number = keys.length
  const props: Object = {}
  let i: number = -1

  while (++i < len) {
    const key: string = keys[i]
    props[key] = asObservable(_props[key])
  }

  return fn.call(null, {props, children, createEventHandler})
}
