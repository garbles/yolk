/* @flow */

import {VirtualSymbol} from './VirtualSymbol'

export function isVirtual (obj?: any): boolean {
  return !!obj && obj[VirtualSymbol]
}
