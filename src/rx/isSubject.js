/* @flow */

import {Subject} from 'rxjs/Subject'

export function isSubject (obj: any): boolean {
  return Boolean(obj instanceof Subject)
}
