/* @flow */

import {VirtualSymbol} from 'yolk/VirtualSymbol'

export function isVirtual (obj?: any): boolean {
  return !!obj && obj[VirtualSymbol]
}
