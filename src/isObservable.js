/* @flow */

import {Observable} from 'rxjs/Observable'

export function isObservable (obj: any): boolean {
  return obj && obj instanceof Observable
}
