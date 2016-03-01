/* @flow */

import {VirtualNode} from './VirtualNode'

export function isVirtualNode (obj?: any): boolean {
  return !!obj && obj instanceof VirtualNode
}
