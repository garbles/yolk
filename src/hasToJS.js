import { default as isFunction } from './isFunction'

export default function hasToJS (obj) {
  return !!obj && isFunction(obj.toJS)
}
