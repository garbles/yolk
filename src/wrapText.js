/* @flow */

import {h} from 'yolk/h'
import {VirtualNode} from 'yolk/VirtualNode'
import {isVirtual} from 'yolk/isVirtual'

function wrap (obj: any): VirtualNode {
  if (isVirtual(obj)) {
    return obj
  }

  return h(`span`, {textContent: obj.toString()})
}

export function wrapText (arr: Array<any>): Array<VirtualNode> {
  return arr.map(wrap)
}
