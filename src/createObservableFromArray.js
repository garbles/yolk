/* @flow */

import {Observable} from 'rxjs/Observable'

import {asObservable} from './asObservable'

import 'rxjs/add/observable/of'
import 'rxjs/add/observable/combineLatest'

export function createObservableFromArray (arr: Array<any>): Observable<Array<any>> {
  if (arr.length === 0) {
    return Observable.of(arr)
  }

  const observables: Array<Observable> = arr.map(asObservable)

  return Observable.combineLatest(...observables)
}
