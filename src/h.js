/* @flow weak */

import {VirtualComponent} from './VirtualComponent'
import {VirtualNode} from './VirtualNode'
import {isString} from './isString'
import {flatten} from './flatten'
import {emptyObject} from './emptyObject'

import type {VirtualElement} from './types'

export function h (tagName, _props, ..._children): VirtualElement {
  const children = flatten(_children)
  const props = _props || emptyObject

  if (isString(tagName)) {
    return VirtualNode.create(tagName, props, children)
  }

  return VirtualComponent.create(tagName, props, children)
}
