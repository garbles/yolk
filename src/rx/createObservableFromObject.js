/* @flow */

import {Observable} from 'rxjs/Observable'
import {asObservable} from './asObservable'
import {isEmptyObject} from '../util/isEmptyObject'

import 'rxjs/add/observable/fromArray'
import 'rxjs/add/operator/combineLatest-static'

export function createObservableFromObject (obj: Object): Observable<Object> {
  if (isEmptyObject(obj)) {
    return Observable.of(obj)
  }

  const keys: Array<string> = Object.keys(obj)
  const len: number = keys.length
  const values: Array<Observable> = Array(len)
  let i: number = -1

  while (++i < len) {
    const key: string = keys[i]
    values[i] = asObservable(obj[key])
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
