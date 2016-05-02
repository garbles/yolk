/* @flow */

import {Observable} from 'rxjs/Observable'
import isObservable from 'is-observable'

import 'rxjs/add/observable/of'

export function asObservable (obj: any): Observable<any> {
  if (isObservable(obj)) {
    return obj
  }

  return Observable.of(obj)
}
