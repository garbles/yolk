/* @flow */

import {asObservable} from '../rx/asObservable'

export function createComponent (fn, _props, children) {
  const keys = Object.keys(_props)
  const len = keys.length
  const props = {}
  let i = -1

  while (++i < len) {
    const key = keys[i]
    props[key] = asObservable(_props[key])
  }

  return fn.call(null, {props, children})
}
