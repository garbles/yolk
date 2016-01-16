/* @flow */

import {Observable} from 'rxjs/Observable'

export function isObservable (obj: any): boolean {
  return Boolean(obj instanceof Observable)
}
