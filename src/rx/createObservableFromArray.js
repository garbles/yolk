/* @flow */

import {Observable} from 'rxjs/Observable'
import {isObservable} from './isObservable'

export function createObservableFromArray (arr: Array<any>): Observable {
  const values: Array<Observable> = arr.map((value: any): Observable => {
    if (isObservable(value)) {
      return value
    }

    return Observable.of(value)
  })

  return Observable.combineLatest(values)
}
