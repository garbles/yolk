/* @flow */

import {createApplyPatch} from './createApplyPatch'

export function patchChildren (node: HTMLElement, next: Array<VirtualNode>, previous?: Array<VirtualNode> = []): Array<VirtualNode> {
  return createApplyPatch(previous, next)(node)
}
