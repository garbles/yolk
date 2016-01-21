/* @flow */

import {h} from './h'
import {VirtualElement} from './VirtualElement'
import {isVirtualElement} from './isVirtualElement'

function wrap (obj: any): VirtualElement {
  if (isVirtualElement(obj)) {
    return obj
  }

  return h(`span`, {textContent: obj.toString()})
}

export function maybeWrapText (arr: Array<any>): Array<VirtualElement> {
  return arr.map(wrap)
}
