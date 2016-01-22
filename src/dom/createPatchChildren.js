/* @flow */

import {VirtualElement} from './VirtualElement'
import {patch} from './patch'

export function createPatchChildren (node: HTMLElement): Function {
  let previous: Array<VirtualElement> = []

  return (next: Array<VirtualElement>): Array<VirtualElement> => {
    patch(node, previous, next)
    previous = next

    return next
  }
}
