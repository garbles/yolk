/* @flow */

import {VirtualNodeSymbol} from './VirtualNode'

export function isVirtualNode (obj?: any): boolean {
  return !!obj && obj[VirtualNodeSymbol]
}
