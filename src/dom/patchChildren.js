/* @flow */

import {batchInsertMessages} from './batchInsertMessages'
import {createApplyPatch} from './createApplyPatch'

const keyFn: Function = a => a.key

export function patchChildren (node: HTMLElement, next: Array<VirtualNode>, previous?: Array<VirtualNode> = []): Array<VirtualNode> {
  const applyPatch: Function = createApplyPatch(previous, next)
  return batchInsertMessages(() => applyPatch(node))
}
