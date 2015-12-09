import { create as createCompositeComponent } from './YolkCompositeComponent'
import { create as createBaseComponent } from './YolkBaseComponent'
import { create as createCustomComponent } from './YolkCustomComponent'
import { default as isString } from './isString'

export default function createElement (tag, _props, ...children) {
  const props = {..._props}

  if (isString(tag)) {
    return createBaseComponent(tag, props, children)
  }

  if (tag._isCustomComponent) {
    return createCustomComponent(tag, props, children)
  }

  return createCompositeComponent(tag, props, children)
}
