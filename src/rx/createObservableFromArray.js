/* @flow */

import {Observable} from 'rxjs/Observable'
import {isObservable} from './isObservable'

import 'rxjs/add/observable/fromArray'
import 'rxjs/add/operator/combineLatest-static'

export function createObservableFromArray (arr: Array<any>): Observable<Array<any>> {
  if (arr.length === 0) {
    return Observable.of([])
  }

  const values: Array<Observable> = arr.map((value: any): Observable<any> => {
    if (isObservable(value)) {
      return value
    }

    return Observable.of(value)
  })

  return Observable.combineLatest(values)
}
