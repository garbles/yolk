/* @flow */

import {h} from './h'
import {VirtualNode} from './VirtualNode'
import {isVirtual} from './is'

function wrap (obj: any): VirtualNode {
  if (isVirtual(obj)) {
    return obj
  }

  return h(`span`, {textContent: obj.toString()})
}

export function wrapText (arr: Array<any>): Array<VirtualNode> {
  return arr.map(wrap)
}
