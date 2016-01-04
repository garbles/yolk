/* @flow */

import {Observable} from 'rxjs/Observable'
import {isObservable} from './isObservable'

import 'rxjs/add/observable/fromArray'
import 'rxjs/add/operator/combineLatest-static'

export function createObservableFromObject (obj: Object): Observable {
  const keys = Object.keys(obj)
  const len = keys.length
  const values = Array(len)
  let i = -1

  while (++i < len) {
    const key = keys[i]
    const value = obj[key]

    if (isObservable(value)) {
      values[i] = value
    } else {
      values[i] = Observable.of(value)
    }
  }

  return Observable.combineLatest(values, function latest () {
    const newObj = {}
    i = -1

    while (++i < len) {
      const key = keys[i]
      newObj[key] = arguments[i]
    }

    return newObj
  })
}
