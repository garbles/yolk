/* @flow */

import {Observable} from 'rxjs/Observable'
import {eventListMap} from './eventsList'
import {asObservable} from 'yolk/asObservable'
import {isSubject} from 'yolk/isSubject'
import {isEmptyObject} from 'yolk/isEmptyObject'

import 'rxjs/add/observable/fromArray'
import 'rxjs/add/operator/combineLatest-static'

const wrapValue = (key, value) => {
  if (eventListMap[key] && isSubject(value)) {
    return asObservable(::value.next)
  }

  return asObservable(value)
}

export function createNodeProps (obj: Object): Observable<Object> {
  if (isEmptyObject(obj)) {
    return Observable.of(obj)
  }

  const keys: Array<string> = Object.keys(obj)
  const len: number = keys.length
  const values: Array<Observable> = Array(len)
  let i: number = -1

  while (++i < len) {
    const key: string = keys[i]
    const value: any = obj[key]
    values[i] = wrapValue(key, value)
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
