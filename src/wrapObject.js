import { default as Rx } from 'rx'
import { default as isPlainObject } from 'lodash.isplainobject'
import { default as isObservable } from './isObservable'
import { default as isEmpty } from './isEmpty'
import { default as hasToJS } from './hasToJS'

export default function wrapObject (obj, opts = {}) {
  if (isObservable(obj)) {
    return obj.flatMapLatest(o => wrapObject(o, opts))
  } else if (hasToJS(obj)) {
    if (opts.base) { // only call toJS about to render base component
      return wrapObject(obj.toJS(), opts)
    }
  } else if (isPlainObject(obj) && !isEmpty(obj)) {
    const keys = Object.keys(obj)
    const length = keys.length
    const values = Array(length)
    let index = -1

    while (++index < length) {
      const key = keys[index]
      values[index] = wrapObject(obj[key], opts)
    }

    return Rx.Observable.combineLatest(values, function combineLatest () {
      const newObj = {}
      index = -1

      while (++index < length) {
        const key = keys[index]
        newObj[key] = arguments[index]
      }

      return newObj
    })
  } else if (Array.isArray(obj) && obj.length) {
    const _obj = obj.map(i => wrapObject(i, opts))
    return Rx.Observable.combineLatest(_obj)
  }

  return Rx.Observable.just(obj)
}
