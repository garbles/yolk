/* @flow weak */

import {VirtualComponent} from './VirtualComponent'
import {VirtualElement} from './VirtualElement'
import {isString} from './is'
import {flatten} from './flatten'
import {emptyObject} from './emptyObject'

import type {VirtualNode} from './types'

export function h (tagName, _props, ..._children): VirtualNode {
  const children = flatten(_children)
  const props = _props || emptyObject

  if (isString(tagName)) {
    return VirtualElement.create(tagName, props, children)
  }

  return VirtualComponent.create(tagName, props, children)
}
