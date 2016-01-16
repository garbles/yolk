/* @flow */

import {VirtualElement} from './VirtualElement'
import {createApplyPatch} from './createApplyPatch'

export function patchChildren (node: HTMLElement, next: Array<VirtualElement>, previous?: Array<VirtualElement> = []): Array<VirtualElement> {
  return createApplyPatch(previous, next)(node)
}
