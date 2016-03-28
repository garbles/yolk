/* @flow */

import {Observable} from 'rxjs/Observable'
import {asObservable} from 'yolk/asObservable'

import 'rxjs/add/observable/fromArray'
import 'rxjs/add/operator/combineLatest-static'

export function createObservableFromArray (arr: Array<any>): Observable<Array<any>> {
  if (arr.length === 0) {
    return Observable.of(arr)
  }

  const values: Array<Observable> = arr.map(asObservable)

  return Observable.combineLatest(values)
}
