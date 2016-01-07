/* @flow */

import {Observable} from 'rxjs/Observable'
import {isObservable} from './isObservable'
import {isEmptyObject} from '../util/isEmptyObject'

import 'rxjs/add/observable/fromArray'
import 'rxjs/add/operator/combineLatest-static'

export function createObservableFromObject (obj: Object): Observable {
  if (isEmptyObject(obj)) {
    return Observable.of({})
  }

  const keys: Array<string> = Object.keys(obj)
  const len: number = keys.length
  const values: Array<Observable> = Array(len)
  let i: number = -1

  while (++i < len) {
    const key: string = keys[i]
    const value: any = obj[key]

    if (isObservable(value)) {
      values[i] = value
    } else {
      values[i] = Observable.of(value)
    }
  }

  return Observable.combineLatest(values, function latest (): Object {
    const newObj: Object = {}
    i = -1

    while (++i < len) {
      const key: string = keys[i]
      newObj[key] = arguments[i]
    }

    return newObj
  })
}
