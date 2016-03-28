/* @flow */

import {$$virtual} from 'yolk/symbol'

export function isVirtual (obj?: any): boolean {
  return !!obj && obj[$$virtual]
}
