/* @flow */

import {h} from './h'
import {VirtualNode} from './VirtualNode'
import {isVirtualNode} from './isVirtualNode'

function wrap (obj: any): VirtualNode {
  if (isVirtualNode(obj)) {
    return obj
  }

  return h(`span`, {textContent: obj.toString()})
}

export function maybeWrapText (arr: Array<any>): Array<VirtualNode> {
  return arr.map(wrap)
}
