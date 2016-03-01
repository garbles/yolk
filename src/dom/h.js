import {createComponent} from './createComponent'
import {createElement} from './VirtualNode'
import {isString} from '../util/isString'
import {flatten} from '../util/flatten'

export function h (tagName, props = {}, ..._children) {
  const children = flatten(_children)

  if (isString(tagName)) {
    return createElement(tagName, props, children)
  }

  return createComponent(tagName, props, children)
}
