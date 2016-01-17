/* @flow */

import {h} from './h'
import {VirtualElement} from './VirtualElement'
import {isVirtualElement} from './isVirtualElement'

export function maybeWrapText (arr: Array<any>): Array<VirtualElement> {
  return arr.map(obj => {
    if (isVirtualElement(obj)) {
      return obj
    }

    return h(`span`, {textContent: obj.toString()})
  })
}
