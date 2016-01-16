/* @flow */

import {VirtualElement} from './VirtualElement'

export function isVirtualElement (obj?: any): boolean {
  return !!obj && obj instanceof VirtualElement
}
