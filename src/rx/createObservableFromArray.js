/* @flow */

import {Observable} from 'rxjs/Observable'
import {isObservable} from './isObservable'

export function createObservableFromArray (arr: Array<any>): Observable {
  const values = arr.map(value => {
    if (isObservable(value)) {
      return value
    }

    return Observable.of(value)
  })

  return Observable.combineLatest(values)
}
