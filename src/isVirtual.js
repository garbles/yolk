/* @flow */

import {$$virtual} from './symbol'

export function isVirtual (obj?: any): boolean {
  return !!obj && obj[$$virtual]
}
