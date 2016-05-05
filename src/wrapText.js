/* @flow */

import {VirtualText} from './VirtualText'
import {isVirtual} from './is'

import type {VirtualElement} from './types'

function wrap (obj: any): VirtualElement {
  if (isVirtual(obj)) {
    return obj
  }

  if (obj === null || obj === undefined) {
    return VirtualText.create(``)
  }

  return VirtualText.create(obj.toString())
}

export function wrapText (arr: Array<any>): Array<VirtualElement> {
  return arr.map(wrap)
}
