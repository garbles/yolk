/* @flow */

import {VirtualElement} from './VirtualElement'
import {createApplyPatch} from './createApplyPatch'

export function createPatchChildren (node: HTMLElement): Function {
  let previous: Array<VirtualElement> = []

  return (next: Array<VirtualElement>): Array<VirtualElement> => {
    return previous = createApplyPatch(previous, next)(node)
  }
}
