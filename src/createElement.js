import { default as YolkCompositeComponent } from './YolkCompositeComponent'
import { default as YolkBaseComponent } from './YolkBaseComponent'
import { default as isString } from './isString'

export default function createElement (tag, _props, ...children) {
  const props = {..._props}

  if (isString(tag)) {
    return YolkBaseComponent.create(tag, props, children)
  }

  if (tag._isCustomComponent) {
    return tag.create(props, children)
  }

  return YolkCompositeComponent.create(tag, props, children)
}
