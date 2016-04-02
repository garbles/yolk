/* @flow */

import {createComponent} from 'yolk/VirtualComponent'
import {createElement} from 'yolk/VirtualNode'
import {isString} from 'yolk/isString'
import {flatten} from 'yolk/flatten'

export function h (tagName, props = {}, ..._children) {
  const children = flatten(_children)

  if (isString(tagName)) {
    return createElement(tagName, props, children)
  }

  return createComponent(tagName, props, children)
}
