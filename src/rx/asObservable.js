/* @flow */

import {Observable} from 'rxjs/Observable'
import {isObservable} from './isObservable'

export function asObservable (obj: any): Observable<any> {
  if (isObservable(obj)) {
    return obj
  }

  return Observable.of(obj)
}
