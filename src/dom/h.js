import {createComponent} from './createComponent'
import {createElement} from './VirtualElement'
import {isString} from '../util/isString'
import {flatten} from '../util/flatten'

export function h (tagName, _props = {}, ..._children) {
  const props = {..._props}
  const children = flatten(_children)

  if (isString(tagName)) {
    return createElement(tagName, props, children)
  }

  return createComponent(tagName, props, children)
}
